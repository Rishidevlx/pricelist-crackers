// Storage Key
const STORAGE_KEY = 'tamilmani_pricelist_state_v3';

// Application State
let appData = {
  categories: [],
  bankDetails: { ...PRICELIST_DATA.bankDetails }
};

let isEditMode = false;
let quantities = {}; // { itemId: qty }
let draggedCategoryIndex = null;
let draggedItemInfo = null; // { catIndex, itemIndex }

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderAllPages();
  setupEventListeners();
  updateLiveSummary();
});

// Load data: Read directly from PRICELIST_DATA, preserving any user quantities
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appData = JSON.parse(saved);
      appData.categories.forEach(cat => {
        cat.items.forEach(it => {
          if (it.mrp === undefined || isNaN(it.mrp)) {
            it.mrp = (parseFloat(it.rate) || 0) * 10;
          }
        });
      });
      normalizeItemIds();
      return;
    } catch (e) {
      console.error('Failed to parse localStorage data, falling back to PRICELIST_DATA', e);
    }
  }

  const flatCategories = [];
  PRICELIST_DATA.pages.forEach(p => {
    p.sections.forEach(s => {
      flatCategories.push({
        id: 'cat_' + Math.random().toString(36).substr(2, 9),
        categoryEng: s.categoryEng || '',
        categoryTam: s.categoryTam || '',
        headerPer: s.headerPer || '',
        items: s.items.map(it => ({
          id: 'item_' + (it.sNo || Math.random().toString(36).substr(2, 9)),
          nameEng: it.nameEng,
          nameTam: it.nameTam,
          rate: parseFloat(it.rate) || 0,
          mrp: it.mrp !== undefined ? parseFloat(it.mrp) : ((parseFloat(it.rate) || 0) * 10),
          per: it.per
        }))
      });
    });
  });

  appData = {
    categories: flatCategories,
    bankDetails: { ...PRICELIST_DATA.bankDetails }
  };
  normalizeItemIds();
}

function normalizeItemIds() {
  appData.categories.forEach((cat, cIdx) => {
    if (!cat.id) cat.id = 'cat_' + cIdx + '_' + Math.random().toString(36).substr(2, 5);
    cat.items.forEach((item, iIdx) => {
      if (!item.id) item.id = 'item_' + cIdx + '_' + iIdx + '_' + Math.random().toString(36).substr(2, 5);
    });
  });
}

// Save to LocalStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// Re-calculate S.No sequentially across all categories & items
function recalculateSerialNumbers() {
  let count = 1;
  appData.categories.forEach(cat => {
    cat.items.forEach(item => {
      item.sNo = count++;
    });
  });
}

// Distribute categories and items into pages (Strict A4 height row budget)
function paginateData() {
  recalculateSerialNumbers();
  const pages = [];
  let currentPageCategories = [];
  let currentRowsInPage = 0;
  const MAX_ROWS_PER_PAGE = 46; // Exact fit for 4 pages containing all 158 items

  appData.categories.forEach((cat, catIdx) => {
    let itemsRemaining = [...cat.items];
    const hasCatHeader = (cat.categoryEng || cat.categoryTam || isEditMode) ? 1 : 0;

    while (itemsRemaining.length > 0) {
      const isNewPageForCat = (currentPageCategories.length === 0);
      const catHeaderWeight = isNewPageForCat ? hasCatHeader : (hasCatHeader ? 1 : 0);
      const spaceAvailable = MAX_ROWS_PER_PAGE - currentRowsInPage - catHeaderWeight;

      if (spaceAvailable <= 0 && currentPageCategories.length > 0) {
        pages.push({
          pageNumber: pages.length + 1,
          categories: currentPageCategories
        });
        currentPageCategories = [];
        currentRowsInPage = 0;
        continue;
      }

      const takeCount = Math.max(1, Math.min(itemsRemaining.length, Math.max(1, spaceAvailable)));
      const itemsForThisPage = itemsRemaining.splice(0, takeCount);

      currentPageCategories.push({
        id: cat.id,
        categoryEng: cat.categoryEng,
        categoryTam: cat.categoryTam,
        headerPer: cat.headerPer || '',
        originalCatIndex: catIdx,
        items: itemsForThisPage
      });

      currentRowsInPage += (hasCatHeader ? 1 : 0) + itemsForThisPage.length;
    }

    // If category has no items yet (empty category)
    if (cat.items.length === 0) {
      currentPageCategories.push({
        id: cat.id,
        categoryEng: cat.categoryEng,
        categoryTam: cat.categoryTam,
        headerPer: cat.headerPer || '',
        originalCatIndex: catIdx,
        items: []
      });
      currentRowsInPage += (hasCatHeader ? 1 : 0);
    }
  });

  if (currentPageCategories.length > 0 || pages.length === 0) {
    pages.push({
      pageNumber: pages.length + 1,
      categories: currentPageCategories
    });
  }

  return pages;
}

// Render All Pages
function renderAllPages() {
  const container = document.getElementById('pagesContainer');
  container.innerHTML = '';

  const pages = paginateData();

  // Update Page Jump Links in Toolbar with dynamic ranges
  const jumpLinks = document.querySelector('.page-jump-links');
  if (jumpLinks) {
    jumpLinks.innerHTML = pages.map(p => {
      let minSno = null;
      let maxSno = null;
      p.categories.forEach(c => {
        c.items.forEach(it => {
          if (minSno === null || it.sNo < minSno) minSno = it.sNo;
          if (maxSno === null || it.sNo > maxSno) maxSno = it.sNo;
        });
      });
      const rangeText = minSno !== null ? ` (${minSno} - ${maxSno})` : '';
      return `<a href="#page-${p.pageNumber}" class="page-chip">Page ${p.pageNumber}${rangeText}</a>`;
    }).join('');
  }

  pages.forEach((pageData) => {
    const pageElem = document.createElement('section');
    pageElem.className = 'a4-page';
    pageElem.id = `page-${pageData.pageNumber}`;

    // Top Banner Strip with Delete Page option
    const topBanner = document.createElement('div');
    topBanner.className = 'page-top-banner';
    topBanner.innerHTML = `
      <span>தரம் !</span>
      <span>உயர்தரம்</span>
      <span>நிரந்தரம்</span>
      ${isEditMode && pages.length > 1 ? `
        <button class="btn-del-page no-print" onclick="deletePage(${pageData.pageNumber})" title="Delete Page ${pageData.pageNumber}">
          🗑️ Delete Page ${pageData.pageNumber}
        </button>
      ` : ''}
    `;
    pageElem.appendChild(topBanner);

    // Table Container
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';

    // Table Element
    const table = document.createElement('table');
    table.className = 'pricelist-table';

    // Table Header (Red) with single-line columns for English & Tamil, MRP Rate, Per, 90% Discount Rate, Qty, Amount
    table.innerHTML = `
      <thead>
        <tr>
          <th class="col-sno">S.No</th>
          <th class="col-name-eng">PRODUCT NAME</th>
          <th class="col-name-tam">பொருளின் பெயர்</th>
          <th class="col-mrp">MRP RATE</th>
          <th class="col-per">PER</th>
          <th class="col-rate">90%<br/><span class="th-sub">DISCOUNT RATE</span></th>
          <th class="col-qty">QTY</th>
          <th class="col-amt">AMOUNT</th>
          ${isEditMode ? '<th class="col-actions no-print">ACTION</th>' : ''}
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Sections and Items
    pageData.categories.forEach((cat) => {
      const actualCatIdx = cat.originalCatIndex;

      // Category Yellow Row
      if (cat.categoryEng || cat.categoryTam || isEditMode) {
        const catTr = document.createElement('tr');
        catTr.className = `category-row ${isEditMode ? 'draggable-cat' : ''}`;
        catTr.dataset.catIndex = actualCatIdx;
        if (isEditMode) {
          catTr.draggable = true;
        }

        catTr.innerHTML = `
          <td class="cat-cell cat-sno">${isEditMode ? '☰' : ''}</td>
          <td class="cat-cell cat-name-eng" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-field="categoryEng">${cat.categoryEng}</td>
          <td class="cat-cell cat-name-tam" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-field="categoryTam">${cat.categoryTam}</td>
          <td class="cat-cell cat-mrp"></td>
          <td class="cat-cell cat-per"></td>
          <td class="cat-cell cat-rate"></td>
          <td class="cat-cell cat-qty"></td>
          <td class="cat-cell cat-amt"></td>
          ${isEditMode ? `
            <td class="cat-cell cat-actions no-print">
              <button class="btn-icon-del" onclick="deleteCategory(${actualCatIdx})" title="Delete Category">🗑️</button>
            </td>
          ` : ''}
        `;
        tbody.appendChild(catTr);
      }

      // Item Rows
      cat.items.forEach((item, itemIdx) => {
        const tr = document.createElement('tr');
        tr.className = `item-row ${isEditMode ? 'draggable-item' : ''}`;
        tr.id = `row-${item.id}`;
        tr.dataset.catIndex = actualCatIdx;
        tr.dataset.itemIndex = itemIdx;
        if (isEditMode) {
          tr.draggable = true;
        }

        const currentQty = quantities[item.id] || '';
        const currentAmt = currentQty ? (item.rate * currentQty).toFixed(2) : '';
        const mrpVal = (item.mrp !== undefined ? item.mrp : item.rate * 10).toFixed(2);

        tr.innerHTML = `
          <td class="cell-sno">${isEditMode ? `<span class="drag-handle">☰</span> ` : ''}${item.sNo}</td>
          <td class="cell-name-eng" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-item-idx="${itemIdx}" data-field="nameEng">${item.nameEng}</td>
          <td class="cell-name-tam" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-item-idx="${itemIdx}" data-field="nameTam">${item.nameTam}</td>
          <td class="cell-mrp">
            <span class="mrp-val" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-item-idx="${itemIdx}" data-field="mrp">${mrpVal}</span>
          </td>
          <td class="cell-per" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-item-idx="${itemIdx}" data-field="per">${item.per}</td>
          <td class="cell-rate">
            <span class="rate-val" ${isEditMode ? 'contenteditable="true"' : ''} data-cat-idx="${actualCatIdx}" data-item-idx="${itemIdx}" data-field="rate">${item.rate.toFixed(2)}</span>
          </td>
          <td class="cell-qty">
            <input type="number" min="0" step="1" class="qty-input ${currentQty > 0 ? 'active-qty' : ''}" data-item-id="${item.id}" data-rate="${item.rate}" value="${currentQty}" />
          </td>
          <td class="cell-amt ${currentAmt ? 'has-val' : ''}" id="amt-${item.id}">${currentAmt}</td>
          ${isEditMode ? `
            <td class="cell-actions no-print">
              <button class="btn-icon-del" onclick="deleteItem(${actualCatIdx}, ${itemIdx})" title="Delete Product">❌</button>
            </td>
          ` : ''}
        `;

        if (currentQty > 0) {
          tr.classList.add('has-qty');
        }

        tbody.appendChild(tr);
      });
    });

    tableContainer.appendChild(table);

    // Bank Details Footer on EVERY page
    const bankFooter = document.createElement('div');
    bankFooter.className = 'page-footer-bank';
    const b = appData.bankDetails;
    bankFooter.innerHTML = `
      <div class="bank-row-1">
        <span class="bank-col-1">Name: <span class="bank-highlight" ${isEditMode ? 'contenteditable="true"' : ''} data-bank="name">${b.name}</span></span>
        <span class="bank-col-2">Bank : <span class="bank-highlight" ${isEditMode ? 'contenteditable="true"' : ''} data-bank="bank">${b.bank}</span></span>
        <span class="bank-col-3">Gpay: <span class="bank-gpay" ${isEditMode ? 'contenteditable="true"' : ''} data-bank="gpay">${b.gpay}</span></span>
      </div>
      <div class="bank-row-2">
        <span class="bank-col-1">A/c : <span class="bank-highlight" ${isEditMode ? 'contenteditable="true"' : ''} data-bank="accountNo">${b.accountNo}</span></span>
        <span class="bank-col-2">IFSC : <span class="bank-highlight" ${isEditMode ? 'contenteditable="true"' : ''} data-bank="ifsc">${b.ifsc}</span></span>
        <span class="bank-col-3 page-total-summary" style="font-weight: 800; color: #b91c1c;"></span>
      </div>
    `;
    tableContainer.appendChild(bankFooter);

    pageElem.appendChild(tableContainer);
    container.appendChild(pageElem);
  });

  attachTableEventListeners();
  if (isEditMode) {
    attachDragAndDropListeners();
  }
}

// Attach Event Listeners to Inputs & Editable elements
function attachTableEventListeners() {
  // QTY Input listener
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const itemId = e.target.dataset.itemId;
      const rate = parseFloat(e.target.dataset.rate) || 0;
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 0) {
        val = 0;
        e.target.value = '';
      }

      quantities[itemId] = val;
      const row = document.getElementById(`row-${itemId}`);
      const amtCell = document.getElementById(`amt-${itemId}`);

      if (val > 0) {
        amtCell.innerText = (rate * val).toFixed(2);
        amtCell.classList.add('has-val');
        row.classList.add('has-qty');
        e.target.classList.add('active-qty');
      } else {
        amtCell.innerText = '';
        amtCell.classList.remove('has-val');
        row.classList.remove('has-qty');
        e.target.classList.remove('active-qty');
      }

      updateLiveSummary();
    });
  });

  // ContentEditable listeners to persist state on blur
  document.querySelectorAll('[contenteditable="true"]').forEach(elem => {
    elem.addEventListener('blur', (e) => {
      const catIdx = e.target.dataset.catIdx;
      const itemIdx = e.target.dataset.itemIdx;
      const field = e.target.dataset.field;
      const bankField = e.target.dataset.bank;
      const text = e.target.innerText.trim();

      if (bankField) {
        appData.bankDetails[bankField] = text;
        saveData();
        document.querySelectorAll(`[data-bank="${bankField}"]`).forEach(el => {
          if (el !== e.target) el.innerText = text;
        });
        return;
      }

      if (catIdx !== undefined) {
        const c = parseInt(catIdx);
        if (itemIdx !== undefined) {
          const i = parseInt(itemIdx);
          const itemObj = appData.categories[c].items[i];
          const row = e.target.closest('tr');

          if (field === 'rate') {
            const num = parseFloat(text) || 0;
            itemObj.rate = num;
            itemObj.mrp = Math.round(num * 10 * 100) / 100;
            e.target.innerText = num.toFixed(2);
            
            const mrpSpan = row?.querySelector('.mrp-val');
            if (mrpSpan) mrpSpan.innerText = (num * 10).toFixed(2);
            
            const qtyInput = row?.querySelector('.qty-input');
            if (qtyInput) qtyInput.dataset.rate = num;

            const amtCell = document.getElementById(`amt-${itemObj.id}`);
            const qty = quantities[itemObj.id] || 0;
            if (amtCell && qty > 0) {
              amtCell.innerText = (num * qty).toFixed(2);
            }
          } else if (field === 'mrp') {
            const mrpNum = parseFloat(text) || 0;
            const rateNum = Math.round(mrpNum * 0.10 * 100) / 100;
            itemObj.mrp = mrpNum;
            itemObj.rate = rateNum;
            e.target.innerText = mrpNum.toFixed(2);

            const rateSpan = row?.querySelector('.rate-val');
            if (rateSpan) rateSpan.innerText = rateNum.toFixed(2);

            const qtyInput = row?.querySelector('.qty-input');
            if (qtyInput) qtyInput.dataset.rate = rateNum;

            const amtCell = document.getElementById(`amt-${itemObj.id}`);
            const qty = quantities[itemObj.id] || 0;
            if (amtCell && qty > 0) {
              amtCell.innerText = (rateNum * qty).toFixed(2);
            }
          } else {
            itemObj[field] = text;
          }
        } else {
          appData.categories[c][field] = text;
        }
        saveData();
        updateLiveSummary();
      }
    });
  });
}

// Drag & Drop Implementation
function attachDragAndDropListeners() {
  // Category Drag & Drop
  document.querySelectorAll('.draggable-cat').forEach(catRow => {
    catRow.addEventListener('dragstart', (e) => {
      draggedCategoryIndex = parseInt(e.target.closest('.category-row').dataset.catIndex);
      draggedItemInfo = null;
      e.dataTransfer.effectAllowed = 'move';
      e.target.classList.add('dragging');
    });

    catRow.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    catRow.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      catRow.classList.add('drag-over');
    });

    catRow.addEventListener('dragleave', () => {
      catRow.classList.remove('drag-over');
    });

    catRow.addEventListener('drop', (e) => {
      e.preventDefault();
      catRow.classList.remove('drag-over');
      const targetCatIndex = parseInt(catRow.dataset.catIndex);

      if (draggedCategoryIndex !== null && draggedCategoryIndex !== targetCatIndex) {
        const movedCat = appData.categories.splice(draggedCategoryIndex, 1)[0];
        appData.categories.splice(targetCatIndex, 0, movedCat);
        saveData();
        renderAllPages();
      }
    });
  });

  // Product Row Drag & Drop
  document.querySelectorAll('.draggable-item').forEach(itemRow => {
    itemRow.addEventListener('dragstart', (e) => {
      const tr = e.target.closest('.item-row');
      draggedItemInfo = {
        catIndex: parseInt(tr.dataset.catIndex),
        itemIndex: parseInt(tr.dataset.itemIndex)
      };
      draggedCategoryIndex = null;
      e.dataTransfer.effectAllowed = 'move';
      tr.classList.add('dragging');
    });

    itemRow.addEventListener('dragend', (e) => {
      e.target.closest('.item-row').classList.remove('dragging');
    });

    itemRow.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      itemRow.classList.add('drag-over');
    });

    itemRow.addEventListener('dragleave', () => {
      itemRow.classList.remove('drag-over');
    });

    itemRow.addEventListener('drop', (e) => {
      e.preventDefault();
      itemRow.classList.remove('drag-over');
      const targetCatIndex = parseInt(itemRow.dataset.catIndex);
      const targetItemIndex = parseInt(itemRow.dataset.itemIndex);

      if (draggedItemInfo !== null) {
        const { catIndex: srcCat, itemIndex: srcItem } = draggedItemInfo;
        if (srcCat === targetCatIndex && srcItem === targetItemIndex) return;

        const movedItem = appData.categories[srcCat].items.splice(srcItem, 1)[0];
        appData.categories[targetCatIndex].items.splice(targetItemIndex, 0, movedItem);
        saveData();
        renderAllPages();
      }
    });
  });
}

// Add New Category
function addNewCategory() {
  const nameEng = prompt('Enter Category Name in English (e.g., FANCY FOUNTAINS):');
  if (!nameEng) return;
  const nameTam = prompt('Enter Category Name in Tamil (e.g., பேன்சி பவுண்டன்):') || '';
  const headerPer = prompt('Enter default PER unit (optional, e.g., 1 Box):') || '';

  appData.categories.push({
    id: 'cat_' + Date.now(),
    categoryEng: nameEng.toUpperCase(),
    categoryTam: nameTam,
    headerPer: headerPer,
    items: []
  });

  saveData();
  renderAllPages();
}

// Add New Product Item
function addNewProduct() {
  if (appData.categories.length === 0) {
    alert('Please add at least one category first!');
    return;
  }

  const categoryOptions = appData.categories.map((c, i) => `${i + 1}. ${c.categoryEng || 'Untitled'}`).join('\n');
  const catChoice = prompt(`Select Category by Number:\n${categoryOptions}\n\nEnter number:`, '1');
  const catIdx = parseInt(catChoice) - 1;

  if (isNaN(catIdx) || catIdx < 0 || catIdx >= appData.categories.length) {
    alert('Invalid Category selection.');
    return;
  }

  const nameEng = prompt('Enter Product Name in English:');
  if (!nameEng) return;
  const nameTam = prompt('Enter Product Name in Tamil:') || '';
  const rateInput = prompt('Enter 90% Discount RATE (Price):', '100');
  const rate = parseFloat(rateInput) || 0;
  const mrp = Math.round(rate * 10 * 100) / 100;
  const per = prompt('Enter PER unit (1 Pkt, 1 Box, 1 Bag):', '1 Box') || '1 Box';

  appData.categories[catIdx].items.push({
    id: 'item_' + Date.now(),
    nameEng: nameEng,
    nameTam: nameTam,
    rate: rate,
    mrp: mrp,
    per: per
  });

  saveData();
  renderAllPages();
  updateLiveSummary();
}

// Delete Whole Page
function deletePage(pageNum) {
  if (confirm(`Are you sure you want to delete Page ${pageNum} and all its products? / பக்கம் ${pageNum}-ஐ நீக்க வேண்டுமா?`)) {
    const pages = paginateData();
    const targetPage = pages.find(p => p.pageNumber === pageNum);
    if (!targetPage) return;

    // Collect category IDs present on this page
    const catIdsToDelete = targetPage.categories.map(c => c.id);

    // Remove categories from appData
    appData.categories = appData.categories.filter(c => !catIdsToDelete.includes(c.id));

    if (appData.manualPageCount && appData.manualPageCount > 1) {
      appData.manualPageCount--;
    }

    saveData();
    renderAllPages();
    updateLiveSummary();
  }
}

// Delete Item
function deleteItem(catIdx, itemIdx) {
  if (confirm('Delete this product row?')) {
    appData.categories[catIdx].items.splice(itemIdx, 1);
    saveData();
    renderAllPages();
    updateLiveSummary();
  }
}

// Delete Category
function deleteCategory(catIdx) {
  if (confirm('Delete this category and all its products?')) {
    appData.categories.splice(catIdx, 1);
    saveData();
    renderAllPages();
    updateLiveSummary();
  }
}

// Add New Page Feature
function addNewPage() {
  const nameEng = prompt('Enter Category Name for New Page (e.g., SPECIAL ITEMS):', 'SPECIAL CRACKERS');
  if (!nameEng) return;
  const nameTam = prompt('Enter Category Name in Tamil:', 'ஸ்பெஷல் கிராக்கர்ஸ்') || '';

  appData.categories.push({
    id: 'cat_' + Date.now(),
    categoryEng: nameEng.toUpperCase(),
    categoryTam: nameTam,
    headerPer: '',
    items: [
      {
        id: 'item_' + Date.now(),
        nameEng: 'New Cracker 1',
        nameTam: 'புதிய வெடி 1',
        rate: 100,
        mrp: 1000,
        per: '1 Box'
      }
    ]
  });

  if (!appData.manualPageCount) appData.manualPageCount = 3;
  appData.manualPageCount++;

  saveData();
  renderAllPages();
  updateLiveSummary();
}

// Update Top Live Summary & All Bank Footers
function updateLiveSummary() {
  let totalItems = 0;
  let totalQty = 0;
  let grandTotal = 0;

  appData.categories.forEach(cat => {
    cat.items.forEach(item => {
      const qty = quantities[item.id] || 0;
      if (qty > 0) {
        totalItems += 1;
        totalQty += qty;
        grandTotal += item.rate * qty;
      }
    });
  });

  document.getElementById('statTotalItems').innerText = totalItems;
  document.getElementById('statTotalQty').innerText = totalQty;
  document.getElementById('statGrandTotal').innerText = `₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  document.querySelectorAll('.page-total-summary').forEach(el => {
    if (grandTotal > 0) {
      el.innerText = `Grand Total: ₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    } else {
      el.innerText = '';
    }
  });
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById('btnDownloadPdf').addEventListener('click', generatePDF);

  document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
  });

  // Excel Export & Import
  document.getElementById('btnExportExcel').addEventListener('click', exportToExcel);
  
  const fileInput = document.getElementById('excelFileInput');
  document.getElementById('btnImportExcel').addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('change', handleExcelUpload);

  document.getElementById('btnAddPage').addEventListener('click', addNewPage);
  document.getElementById('btnAddCategory').addEventListener('click', addNewCategory);
  document.getElementById('btnAddItem').addEventListener('click', addNewProduct);

  document.getElementById('btnToggleEdit').addEventListener('click', () => {
    isEditMode = !isEditMode;
    const btn = document.getElementById('btnToggleEdit');
    const container = document.getElementById('pagesContainer');

    if (isEditMode) {
      btn.classList.add('active');
      btn.innerHTML = `<span>💾</span> Save Edits`;
      container.classList.add('edit-mode');
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `<span>✏️</span> Edit Mode`;
      container.classList.remove('edit-mode');
    }
    renderAllPages();
  });

  document.getElementById('btnResetData').addEventListener('click', () => {
    if (confirm('Reset entire price list back to original default 144 items? / எல்லாவற்றையும் ஆரம்ப நிலைக்கு மாற்ற வேண்டுமா?')) {
      localStorage.removeItem(STORAGE_KEY);
      quantities = {};
      loadData();
      renderAllPages();
      updateLiveSummary();
    }
  });

  // Search Filter
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('.item-row');

    rows.forEach(row => {
      const eng = row.querySelector('.cell-name-eng')?.innerText.toLowerCase() || '';
      const tam = row.querySelector('.cell-name-tam')?.innerText.toLowerCase() || '';
      const sNo = row.querySelector('.cell-sno')?.innerText.toLowerCase() || '';

      if (!query || eng.includes(query) || tam.includes(query) || sNo.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// =========================================
// EXCEL EXPORT & IMPORT (SheetJS)
// =========================================
function exportToExcel() {
  const exportRows = [];

  appData.categories.forEach(cat => {
    const catName = cat.categoryEng || cat.categoryTam || 'General';
    cat.items.forEach(item => {
      const qty = quantities[item.id] || '';
      const amount = qty ? (item.rate * qty).toFixed(2) : '';
      exportRows.push({
        'Category (English)': cat.categoryEng,
        'Category (Tamil)': cat.categoryTam,
        'S.No': item.sNo,
        'Product Name (English)': item.nameEng,
        'Product Name (Tamil)': item.nameTam,
        'MRP Rate (₹)': (item.mrp !== undefined ? item.mrp : item.rate * 10).toFixed(2),
        'Per': item.per,
        '90% Discount Rate (₹)': item.rate.toFixed(2),
        'Quantity': qty,
        'Amount (₹)': amount
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(exportRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PriceList 2026');
  XLSX.writeFile(wb, 'Akshaya_Crackers_Pricelist_2026.xlsx');
}

function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!jsonData || jsonData.length === 0) {
        alert('The uploaded Excel file appears to be empty.');
        return;
      }

      // Group rows by Category
      const categoriesMap = {};
      const categoriesOrder = [];

      jsonData.forEach((row, index) => {
        // Detect keys flexibly
        const catEng = (row['Category (English)'] || row['Category'] || row['category'] || 'GENERAL').toString().trim();
        const catTam = (row['Category (Tamil)'] || '').toString().trim();
        const nameEng = (row['Product Name (English)'] || row['Product Name'] || row['Name'] || row['Item Name'] || row['English Name'] || `Item ${index + 1}`).toString().trim();
        const nameTam = (row['Product Name (Tamil)'] || row['Tamil Name'] || '').toString().trim();
        const rate = parseFloat(row['90% Discount Rate (₹)'] || row['90% Discount Rate'] || row['90% Rate'] || row['Rate (₹)'] || row['Rate'] || row['Price'] || row['RATE'] || 0) || 0;
        const mrp = parseFloat(row['MRP Rate (₹)'] || row['MRP Rate'] || row['MRP'] || 0) || (rate * 10);
        const per = (row['Per'] || row['PER'] || row['Unit'] || '1 Box').toString().trim();

        const catKey = catEng.toUpperCase();
        if (!categoriesMap[catKey]) {
          categoriesMap[catKey] = {
            id: 'cat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            categoryEng: catEng.toUpperCase(),
            categoryTam: catTam,
            headerPer: '',
            items: []
          };
          categoriesOrder.push(catKey);
        }

        categoriesMap[catKey].items.push({
          id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          nameEng: nameEng,
          nameTam: nameTam,
          rate: rate,
          mrp: mrp,
          per: per
        });
      });

      // Update appData
      appData.categories = categoriesOrder.map(key => categoriesMap[key]);
      quantities = {};
      saveData();
      renderAllPages();
      updateLiveSummary();

      alert(`✅ Excel Imported Successfully!\nLoaded ${jsonData.length} products across ${categoriesOrder.length} categories.`);
    } catch (err) {
      console.error('Error importing Excel file:', err);
      alert('Failed to read Excel file. Please ensure it is a valid .xlsx or .csv file: ' + err.message);
    } finally {
      event.target.value = ''; // Reset input
    }
  };

  reader.readAsArrayBuffer(file);
}

// Exact Multi-Page PDF Generator
async function generatePDF() {
  const overlay = document.getElementById('pdfLoadingOverlay');
  overlay.style.display = 'flex';

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageElems = document.querySelectorAll('.a4-page');

    for (let i = 0; i < pageElems.length; i++) {
      const pageElem = pageElems[i];

      const canvas = await html2canvas(pageElem, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#009db8',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const clonedPage = clonedDoc.getElementById(pageElem.id);
          if (clonedPage) {
            clonedPage.style.boxShadow = 'none';
            clonedPage.style.borderRadius = '0';
            // Clean action buttons from print
            clonedPage.querySelectorAll('.no-print').forEach(el => el.remove());
            clonedPage.querySelectorAll('.drag-handle').forEach(el => el.remove());
            
            // Replace input fields with static styled text if they have values
            clonedPage.querySelectorAll('.qty-input').forEach(input => {
              const val = input.value;
              if (val) {
                const span = clonedDoc.createElement('span');
                span.style.fontWeight = '700';
                span.style.fontSize = '10px';
                span.style.color = '#000';
                span.innerText = val;
                input.parentNode.replaceChild(span, input);
              } else {
                input.style.border = 'none';
                input.style.background = 'transparent';
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    pdf.save('Akshaya_Crackers_Pricelist_2026.pdf');
  } catch (err) {
    console.error('PDF Generation Error:', err);
    alert('PDF Generation failed: ' + (err.message || err));
  } finally {
    overlay.style.display = 'none';
  }
}
