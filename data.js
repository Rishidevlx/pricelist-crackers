const PRICELIST_DATA = {
  bankDetails: {
    name: "Tamil Mani Traders",
    bank: "AXIS BANK, SIVAKASI",
    gpay: "99947 03605",
    accountNo: "12345678909876",
    ifsc: "ExampleUPI"
  },
  pages: [
    {
      pageNumber: 1,
      sections: [
        {
          categoryEng: "ONE SOUND CRACKERS",
          categoryTam: "ஒரு சவுண்ட் வெடிகள்",
          headerPer: "",
          items: [
            { sNo: 1, nameEng: "3 ½\" Laxmi", nameTam: "3½\" லட்சுமி", rate: 15.00, per: "1 Pkt" },
            { sNo: 2, nameEng: "2 ¾\" Kuruvi", nameTam: "2¾\" குருவி", rate: 10.00, per: "1 Pkt" },
            { sNo: 3, nameEng: "4\" Laxmi", nameTam: "4\" லட்சுமி", rate: 25.00, per: "1 Pkt" },
            { sNo: 4, nameEng: "4\" Deluxe Lakshmi", nameTam: "4\" டீலக்ஸ் லட்சுமி", rate: 40.00, per: "1 Pkt" },
            { sNo: 5, nameEng: "4\" Super deluxe Laxmi / Gold", nameTam: "4\" சூப்பர் டீலக்ஸ் லட்சுமி/கோல்டு", rate: 45.00, per: "1 Pkt" },
            { sNo: 6, nameEng: "Two Sound Cracker", nameTam: "2\" சவுண்ட் வெடி", rate: 45.00, per: "1 Pkt" },
            { sNo: 7, nameEng: "5\" Bhagubali Mega", nameTam: "5\" பாகுபலி மெகா", rate: 60.00, per: "1 Pkt" }
          ]
        },
        {
          categoryEng: "BIJILI CRACKERS",
          categoryTam: "பிஜிலி வெடிகள்",
          headerPer: "",
          items: [
            { sNo: 8, nameEng: "Red Bijili 100's", nameTam: "ரெட் பிஜிலி", rate: 40.00, per: "1 Bag" },
            { sNo: 9, nameEng: "Stripped Bijili 100's", nameTam: "கோடு பிஜிலி", rate: 50.00, per: "1 Bag" },
            { sNo: 10, nameEng: "1/4 kg paper bomb", nameTam: "1/4 கிலோ பேப்பர் பாம்", rate: 50.00, per: "1 Box" },
            { sNo: 11, nameEng: "1/2 kg Paper Bomb", nameTam: "1/2 கிலோ பேப்பர் பாம்", rate: 100.00, per: "1 Box" },
            { sNo: 12, nameEng: "1 kg Paper Bomb", nameTam: "1 கிலோ பேப்பர் பாம்", rate: 200.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "ELECTRIC CRACKERS",
          categoryTam: "எலக்ட்ரிக் கிராக்கர்ஸ்",
          headerPer: "",
          items: [
            { sNo: 13, nameEng: "28 Chorsa", nameTam: "28 சோர்சா", rate: 19.00, per: "1 Pkt" },
            { sNo: 14, nameEng: "28 Giant Crackers", nameTam: "28 ஜெயின்ட் வெடி", rate: 35.00, per: "1 Pkt" },
            { sNo: 15, nameEng: "56 Giant Crackers Mega", nameTam: "56 ஜெயின்ட் மெகா வெடி", rate: 70.00, per: "1 Pkt" },
            { sNo: 16, nameEng: "24 Deluxe Crackers", nameTam: "24 டீலக்ஸ் வெடி", rate: 75.00, per: "1 Pkt" },
            { sNo: 17, nameEng: "50 Deluxe Crackers", nameTam: "50 டீலக்ஸ் வெடி", rate: 130.00, per: "1 Pkt" },
            { sNo: 18, nameEng: "100 Deluxe Crackers", nameTam: "100 டீலக்ஸ் வெடி", rate: 240.00, per: "1 Pkt" },
            { sNo: 19, nameEng: "100 Deluxe Mega 4\"", nameTam: "100 மெகா", rate: 350.00, per: "1 Pkt" }
          ]
        },
        {
          categoryEng: "GARLANDS",
          categoryTam: "சரவெடிகள்",
          headerPer: "",
          items: [
            { sNo: 20, nameEng: "100 Wala", nameTam: "100 சர வெடி", rate: 50.00, per: "1 Box" },
            { sNo: 21, nameEng: "200 Wala", nameTam: "200 சர வெடி", rate: 80.00, per: "1 Box" },
            { sNo: 22, nameEng: "300 Wala", nameTam: "300 சர வெடி", rate: 110.00, per: "1 Box" },
            { sNo: 23, nameEng: "1000 Wala", nameTam: "1,000 சர வெடி", rate: 300.00, per: "1 Box" },
            { sNo: 24, nameEng: "2000 Wala", nameTam: "2,000 சர வெடி", rate: 600.00, per: "1 Box" },
            { sNo: 25, nameEng: "5000 Wala", nameTam: "5,000 சர வெடி", rate: 1500.00, per: "1 Box" },
            { sNo: 26, nameEng: "10000 Wala", nameTam: "10,000 சர வெடி", rate: 3000.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "TWINKLING STAR",
          categoryTam: "சாட்டை வகைகள்",
          headerPer: "",
          items: [
            { sNo: 27, nameEng: "1½\" Twinkling Star", nameTam: "1½\" சாட்டை", rate: 35.00, per: "1 Box" },
            { sNo: 28, nameEng: "4\" Twinkling Star", nameTam: "4\" சாட்டை", rate: 70.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "PENCIL",
          categoryTam: "பென்சில் வகைகள்",
          headerPer: "",
          items: [
            { sNo: 29, nameEng: "Popcorn Pencil", nameTam: "பாப்கான் பென்சில்", rate: 210.00, per: "1 Box" },
            { sNo: 30, nameEng: "Sivakasi Spl Pencil", nameTam: "சிவகாசி ஸ்பெஷல் பென்சில்", rate: 250.00, per: "1 Box" },
            { sNo: 31, nameEng: "Navarang Multi Colour", nameTam: "நவரங் மல்டி கலர்", rate: 180.00, per: "1 Box" },
            { sNo: 32, nameEng: "Hi tec Pencil", nameTam: "ஹை டெக் பென்சில்", rate: 220.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "GROUND CHAKKAR",
          categoryTam: "தரைச்சக்கரம்",
          headerPer: "",
          items: [
            { sNo: 33, nameEng: "Ground Chakkar Big (10Pcs)", nameTam: "தரைச்சக்கரம் பெரியது", rate: 45.00, per: "1 Box" },
            { sNo: 34, nameEng: "Ground Chakkar Big (25 Pcs)", nameTam: "தரைச்சக்கரம் பெறயது (25 பீஸ்)", rate: 110.00, per: "1 Box" },
            { sNo: 35, nameEng: "Ground Chakkar Spl", nameTam: "தரைச்சக்கரம் ஸ்பெஷல்", rate: 90.00, per: "1 Box" },
            { sNo: 36, nameEng: "Ground Chakkar deluxe", nameTam: "தரைச்சக்கரம் டீலக்ஸ்", rate: 140.00, per: "1 Box" },
            { sNo: 37, nameEng: "Whizling Wheel", nameTam: "விசிலிங் சக்கரம்", rate: 160.00, per: "1 Box" },
            { sNo: 38, nameEng: "Ground Chakkar (Red&Green)", nameTam: "சக்கரம் சிவப்பு & பச்சை", rate: 230.00, per: "1 Box" },
            { sNo: 39, nameEng: "Wire Chakker", nameTam: "வயர் சக்கரம்", rate: 200.00, per: "1 Box" },
            { sNo: 40, nameEng: "Ground Chakker Spinner SPL", nameTam: "சக்கரம் ஸ்பின்னர் ஸ்பெஷல்", rate: 170.00, per: "1 Box" },
            { sNo: 41, nameEng: "Ground Chakker Spinner DLX", nameTam: "சக்கரம் ஸ்பின்னர் டீலக்ஸ்", rate: 200.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "FLOWER POTS",
          categoryTam: "பூச்சட்டி வகைகள்",
          headerPer: "",
          items: [
            { sNo: 42, nameEng: "Flower Pot Small", nameTam: "பூச்சட்டி சிறியது", rate: 70.00, per: "1 Box" },
            { sNo: 43, nameEng: "Flower Pot Big", nameTam: "பூச்சட்டி பெரியது", rate: 90.00, per: "1 Box" },
            { sNo: 44, nameEng: "Flower Pot Spl", nameTam: "பூச்சட்டி ஸ்பெஷல்", rate: 120.00, per: "1 Box" },
            { sNo: 45, nameEng: "Flower Pot Asoka", nameTam: "பூச்சட்டி அசோகா", rate: 140.00, per: "1 Box" },
            { sNo: 46, nameEng: "Flower Pot Deluxe (5Pcs)", nameTam: "பூச்சட்டி டீலக்ஸ்", rate: 240.00, per: "1 Box" },
            { sNo: 47, nameEng: "Multi Color Giant", nameTam: "மட்டிகலர் ஜெயண்ட்", rate: 380.00, per: "1 Box" },
            { sNo: 48, nameEng: "Multi Color Giant DLX", nameTam: "மட்டிகலர் ஜெயண்ட் டீலக்ஸ்", rate: 510.00, per: "1 Box" }
          ]
        }
      ]
    },
    {
      pageNumber: 2,
      sections: [
        {
          categoryEng: "",
          categoryTam: "",
          headerPer: "",
          items: [
            { sNo: 49, nameEng: "Color Koti", nameTam: "கலர் கோட்டி", rate: 230.00, per: "1 Box" },
            { sNo: 50, nameEng: "Sparkling Koti", nameTam: "ஸ்பார்க்கிங் கோட்டி", rate: 390.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "BOMB",
          categoryTam: "பாம்",
          headerPer: "",
          items: [
            { sNo: 51, nameEng: "Bullet Bombs", nameTam: "புல்லட் பாம்", rate: 40.00, per: "1 Box" },
            { sNo: 52, nameEng: "Hydro Bomb Green", nameTam: "ஹைட்ரோ பாம்", rate: 80.00, per: "1 Box" },
            { sNo: 53, nameEng: "King of King Green", nameTam: "கிங் ஆப் கிங் பச்சை", rate: 120.00, per: "1 Box" },
            { sNo: 54, nameEng: "Classic Bombs", nameTam: "கிளாசிக் பாம்", rate: 150.00, per: "1 Box" },
            { sNo: 55, nameEng: "King of Kong", nameTam: "கிங் ஆப் காங்", rate: 200.00, per: "1 Box" },
            { sNo: 56, nameEng: "Dianoser DLX Bomb", nameTam: "டைனோசர் பாம்", rate: 250.00, per: "1 Box" },
            { sNo: 57, nameEng: "Agni Bomb", nameTam: "அக்னி பாம்", rate: 270.00, per: "1 Box" },
            { sNo: 58, nameEng: "Digital Bomb", nameTam: "டிஜிடல் பாம்", rate: 290.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "ROCKETS",
          categoryTam: "ராக்கெட்",
          headerPer: "",
          items: [
            { sNo: 59, nameEng: "Rockt Bomb", nameTam: "ராக்கெட் பாம்", rate: 70.00, per: "1 Box" },
            { sNo: 60, nameEng: "Lunic Rocket", nameTam: "லூனிக் ராக்கெட்", rate: 150.00, per: "1 Box" },
            { sNo: 61, nameEng: "2 Sound Rocket", nameTam: "2 சவுண்ட் ராக்கெட்", rate: 165.00, per: "1 Box" },
            { sNo: 62, nameEng: "3 Sound Rocket", nameTam: "3 சவுண்ட் ராக்கெட்", rate: 175.00, per: "1 Box" },
            { sNo: 63, nameEng: "Whiziling Rocket", nameTam: "விசிலிங் ராக்கெட்", rate: 200.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "AERIAL FANCY",
          categoryTam: "ஏரியல் பேன்சி",
          headerPer: "",
          items: [
            { sNo: 64, nameEng: "Colour Changing Butterfly", nameTam: "கலர் சேன்ஜ் பட்டர்பிளை", rate: 95.00, per: "1 Box" },
            { sNo: 65, nameEng: "Photo Flash", nameTam: "போட்டோ பிளாஸ்", rate: 60.00, per: "1 Box" },
            { sNo: 66, nameEng: "Kit Kat", nameTam: "கிட்கேட்", rate: 45.00, per: "1 Box" },
            { sNo: 67, nameEng: "Disco Shower", nameTam: "டிஸ்கோ சுவர்", rate: 105.00, per: "1 Box" },
            { sNo: 68, nameEng: "Electric Stone", nameTam: "எலக்ட்ரிக் ஸ்டோன்", rate: 30.00, per: "1 Box" },
            { sNo: 69, nameEng: "Shin Chan", nameTam: "ஜிங் சாங்", rate: 145.00, per: "1 Box" },
            { sNo: 70, nameEng: "Magic Peacock", nameTam: "மேஜிக் பீக்காக்", rate: 185.00, per: "1 Box" },
            { sNo: 71, nameEng: "Siren (2Pcs)", nameTam: "சைரன் (2பீஸ்)", rate: 235.00, per: "1 Box" },
            { sNo: 72, nameEng: "Assorted Cartoon", nameTam: "அசோட்டட் கார்டூன்", rate: 55.00, per: "1 Box" },
            { sNo: 73, nameEng: "Lolipop", nameTam: "லாலி பாப்", rate: 250.00, per: "1 Box" },
            { sNo: 74, nameEng: "Penta Sky (5pcs)", nameTam: "பென்டா ஸ்கை (5பீஸ்)", rate: 180.00, per: "1 Box" },
            { sNo: 75, nameEng: "Bambaram", nameTam: "பம்பரம்", rate: 130.00, per: "1 Box" },
            { sNo: 76, nameEng: "Dora", nameTam: "டோரா", rate: 190.00, per: "1 Box" },
            { sNo: 77, nameEng: "Smoke", nameTam: "ஸ்மோக்", rate: 140.00, per: "1 Box" },
            { sNo: 78, nameEng: "Selfi Stick", nameTam: "செல்பி ஸ்டிக்", rate: 85.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "New Arrival FANCY CRACKERS",
          categoryTam: "புதிதாக வந்த பேன்சி வெடிகள்",
          headerPer: "",
          items: [
            { sNo: 79, nameEng: "Velum Mayilum", nameTam: "வேலும் மயிலும்", rate: 260.00, per: "1 Box" },
            { sNo: 80, nameEng: "Bat & Ball", nameTam: "பேட் & பால்", rate: 280.00, per: "1 Box" },
            { sNo: 81, nameEng: "Color Rain (5Pcs)", nameTam: "கலர் ரையரின்", rate: 145.00, per: "1 Box" },
            { sNo: 82, nameEng: "Peacock Feather (5Pcs)", nameTam: "பீக்காக் பெதர்", rate: 160.00, per: "1 Box" },
            { sNo: 83, nameEng: "Golden Raise (5Pcs)", nameTam: "கோல்டன் ரெயிஸ்", rate: 155.00, per: "1 Box" },
            { sNo: 84, nameEng: "Bada Peacock", nameTam: "படா பீக்காக்", rate: 410.00, per: "1 Box" },
            { sNo: 85, nameEng: "Emu Egg", nameTam: "ஈமு எக்", rate: 275.00, per: "1 Box" },
            { sNo: 86, nameEng: "900cc", nameTam: "900 சிசி", rate: 230.00, per: "1 Box" },
            { sNo: 87, nameEng: "Mr.Bean", nameTam: "100 கே", rate: 320.00, per: "1 Box" },
            { sNo: 88, nameEng: "90 watts", nameTam: "90 வாட்ஸ்", rate: 200.00, per: "1 Box" },
            { sNo: 89, nameEng: "Black Money (5pcs)", nameTam: "பிளாக் மணி", rate: 300.00, per: "1 Box" },
            { sNo: 90, nameEng: "Magic Show (5Pcs)", nameTam: "மேஜிக் ஷோ", rate: 260.00, per: "1 Box" },
            { sNo: 91, nameEng: "Water Queen", nameTam: "வாட்டர் குயின்", rate: 195.00, per: "1 Box" },
            { sNo: 92, nameEng: "Money in the Bank", nameTam: "மனி இந்த பேங்க்", rate: 230.00, per: "1 Box" },
            { sNo: 93, nameEng: "Old is Gold", nameTam: "வோல்ட் இஸ் கோல்டு", rate: 260.00, per: "1 Box" },
            { sNo: 94, nameEng: "Top Gun (5Pcs)", nameTam: "டாப் கன்", rate: 245.00, per: "1 Box" },
            { sNo: 95, nameEng: "6\" Crackling Queen", nameTam: "6\" கிராக்லிங் குயின்", rate: 175.00, per: "1 Box" },
            { sNo: 96, nameEng: "4 & 4 Wheel (5Pcs)", nameTam: "4 & 4 வீல் (5பீஸ்)", rate: 200.00, per: "1 Box" },
            { sNo: 97, nameEng: "Drone (5Pcs)", nameTam: "ட்ரோன் (5பீஸ்)", rate: 200.00, per: "1 Box" },
            { sNo: 98, nameEng: "Tin Bear", nameTam: "டின் பியர்", rate: 95.00, per: "1 Box" },
            { sNo: 99, nameEng: "Tricolor (5Pcs)", nameTam: "டிரைகலர்", rate: 255.00, per: "1 Box" },
            { sNo: 100, nameEng: "Polo", nameTam: "போலோ", rate: 50.00, per: "1 Box" },
            { sNo: 101, nameEng: "Cylinder Bomb", nameTam: "சிலிண்டர் பாம்", rate: 200.00, per: "1 Pcs" },
            { sNo: 102, nameEng: "Combo Colour Spinner", nameTam: "காம்போ கலர் ஸ்பின்னர்", rate: 260.00, per: "1 Box" }
          ]
        }
      ]
    },
    {
      pageNumber: 3,
      sections: [
        {
          // categoryEng: "",
          // categoryTam: "",
          // headerPer: "",
          items: [
            { sNo: 103, nameEng: "Teddy", nameTam: "டெடி", rate: 75.00, per: "1 Box" },
            { sNo: 104, nameEng: "Kulfi", nameTam: "குல்பி", rate: 170.00, per: "1 Box" },
            { sNo: 105, nameEng: "Cone", nameTam: "கோன்", rate: 285.00, per: "1 Box" },
            { sNo: 106, nameEng: "RED BULL", nameTam: "ரெட் புள்", rate: 175.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "AERIAL FANCY",
          categoryTam: "ஏரியல் பேன்சி",
          headerPer: "",
          items: [
            { sNo: 107, nameEng: "Seven Shot (5Pcs)", nameTam: "செவன் ஷாட்", rate: 120.00, per: "1 Box" },
            { sNo: 108, nameEng: "Chotta Fancy", nameTam: "சோட்டா பேன்சி", rate: 55.00, per: "1 Box" },
            { sNo: 109, nameEng: "2\" Pipe", nameTam: "2\" பைப்", rate: 115.00, per: "1 Box" },
            { sNo: 110, nameEng: "2\" Pipe (3Pcs)", nameTam: "2\" பைப் (3பீஸ்)", rate: 260.00, per: "1 Box" },
            { sNo: 111, nameEng: "3½\" Pip", nameTam: "3½\" பைப்", rate: 290.00, per: "1 Box" },
            { sNo: 112, nameEng: "3½\" Pipe (2Pcs)", nameTam: "2¾\" பைப் (2பீஸ்)", rate: 580.00, per: "1 Box" },
            { sNo: 113, nameEng: "3½\" Pipe (Doble Ball)", nameTam: "3\" பைப் டபுள் பால்", rate: 440.00, per: "1 Box" },
            { sNo: 114, nameEng: "3½\" Pipe (Seven Step)", nameTam: "3½\" பைப் செவன் ஸ்டெப்", rate: 440.00, per: "1 Box" },
            { sNo: 115, nameEng: "4\" Pipe", nameTam: "4\" பைப்", rate: 390.00, per: "1 Box" },
            { sNo: 116, nameEng: "4\" Pipe Jumbo (2 Pcs)", nameTam: "4\" பைப் ஜம்போ (2பீஸ்)", rate: 1100.00, per: "1 Box" },
            { sNo: 117, nameEng: "Nayagara", nameTam: "நயாகரா", rate: 420.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "AERIAL REPEATING FANCY",
          categoryTam: "ஏரியல் ரிப்பீட்டிங் சாட்",
          headerPer: "",
          items: [
            { sNo: 118, nameEng: "12 Star (Colour)", nameTam: "12 ஸ்டார் (கலர்)", rate: 125.00, per: "1 Box" },
            { sNo: 119, nameEng: "12 Star (Crackling)", nameTam: "12 ஸ்டார் கிராக்லிங்", rate: 150.00, per: "1 Box" },
            { sNo: 120, nameEng: "Whistling (25 Shots)", nameTam: "விசிலிங் (25 சாட்)", rate: 830.00, per: "1 Box" },
            { sNo: 121, nameEng: "16 Multi Colour Shot", nameTam: "16 மல்டிகலர் சாட்", rate: 270.00, per: "1 Box" },
            { sNo: 122, nameEng: "30 MultiColour with Crackling", nameTam: "30 மல்டிகலர் வித் கிராக்லிங்", rate: 450.00, per: "1 Box" },
            { sNo: 123, nameEng: "60 MultiColour with Crackling", nameTam: "60 மல்டிகலர் வித் கிராக்லிங்", rate: 900.00, per: "1 Box" },
            { sNo: 124, nameEng: "120 MultiColour with Crackling", nameTam: "120 மல்டிகலர் வித் கிராக்லிங்", rate: 1800.00, per: "1 Box" },
            { sNo: 125, nameEng: "240 MultiColour with Crackling", nameTam: "240 மல்டிகலர் வித் கிராக்லிங்", rate: 3600.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "SPARKLERS",
          categoryTam: "கம்பி மத்தாப்பூ",
          headerPer: "",
          items: [
            { sNo: 126, nameEng: "Queen", nameTam: "குயின்", rate: 180.00, per: "1 Box" },
            { sNo: 127, nameEng: "Laptop", nameTam: "லேப்டாப்", rate: 240.00, per: "1 Box" },
            { sNo: 128, nameEng: "Super Deluxe", nameTam: "சூப்பர் டீலக்ஸ்", rate: 130.00, per: "1 Box" },
            { sNo: 129, nameEng: "Roll Cap", nameTam: "ரோல் கேப்", rate: 75.00, per: "1 Box" },
            { sNo: 130, nameEng: "10 X 10 Shorts Multi Colour Crackling", nameTam: "10 X 10 ஷாட்ஸ் மல்டி கலர் கிராக்கிலிங்", rate: 0.00, per: "1 Box" },
            { sNo: 131, nameEng: "Wiva 10 X 10 Multi Colour Crackling", nameTam: "விவா 10 X 10 மல்டி கலர் கிராக்கிலிங்", rate: 0.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "SPARKLERS",
          categoryTam: "கம்பி மத்தாப்பூ",
          headerPer: "",
          items: [
            { sNo: 132, nameEng: "7 cm Electric Sparklers", nameTam: "7 செமி சாதா கம்பி", rate: 15.00, per: "1 Box" },
            { sNo: 133, nameEng: "7 cm Glittering Sparklers", nameTam: "7 செமி கிலிடரிங் கம்பி", rate: 18.00, per: "1 Box" },
            { sNo: 134, nameEng: "7 cm Green Sparklers", nameTam: "7 செமி பச்சை கம்பி", rate: 20.00, per: "1 Box" },
            { sNo: 135, nameEng: "7 cm Red Sparklers", nameTam: "7 செமி சிவப்பு கம்பி", rate: 23.00, per: "1 Box" },
            { sNo: 136, nameEng: "10 cm Electric Sparklers", nameTam: "10 செமி சாதா கம்பி", rate: 25.00, per: "1 Box" },
            { sNo: 137, nameEng: "10 cm Glittering Sparklers", nameTam: "10 செமி கிலிடரிங் கம்பி", rate: 30.00, per: "1 Box" },
            { sNo: 138, nameEng: "10 cm Green Sparklers", nameTam: "10 செமி பச்சை கம்பி", rate: 35.00, per: "1 Box" },
            { sNo: 139, nameEng: "10 cm Red Sparklers", nameTam: "10 செமி சிவப்பு கம்பி", rate: 40.00, per: "1 Box" },
            { sNo: 140, nameEng: "12 cm Electric Sparklers", nameTam: "12 செமி சாதா கம்பி", rate: 35.00, per: "1 Box" },
            { sNo: 141, nameEng: "12 cm Glittering Sparklers", nameTam: "12 செமி கிலிடரிங் கம்பி", rate: 40.00, per: "1 Box" },
            { sNo: 142, nameEng: "12 cm Green Sparklers", nameTam: "12 செமி பச்சை கம்பி", rate: 45.00, per: "1 Box" },
            { sNo: 143, nameEng: "12 cm Red Sparklers", nameTam: "12 செமி சிவப்பு கம்பி", rate: 50.00, per: "1 Box" },
            { sNo: 144, nameEng: "15 cm Electric Sparklers", nameTam: "15 செமி சாதா கம்பி", rate: 45.00, per: "1 Box" },
            { sNo: 145, nameEng: "15 cm Glittering Sparklers", nameTam: "15 செமி கிலிடரிங் கம்பி", rate: 47.00, per: "1 Box" },
            { sNo: 146, nameEng: "15 cm Green Sparklers", nameTam: "15 செமி பச்சை கம்பி", rate: 50.00, per: "1 Box" },
            { sNo: 147, nameEng: "15 cm Red Sparklers", nameTam: "15 செமி சிவப்பு கம்பி", rate: 60.00, per: "1 Box" },
            { sNo: 148, nameEng: "30 cm Electric Sparklers", nameTam: "30 செமி சாதா கம்பி", rate: 45.00, per: "1 Box" },
            { sNo: 149, nameEng: "30 cm Glittering Sparklers", nameTam: "30 செமி கிலிடரிங் கம்பி", rate: 47.00, per: "1 Box" },
            { sNo: 150, nameEng: "30 cm Green Sparklers", nameTam: "30 செமி பச்சை கம்பி", rate: 50.00, per: "1 Box" },
            { sNo: 151, nameEng: "30 cm Red Sparklers", nameTam: "30 செமி சிவப்பு கம்பி", rate: 60.00, per: "1 Box" },
            { sNo: 152, nameEng: "50 cm Electric Sparklers", nameTam: "50 செமி சாதா கம்பி", rate: 210.00, per: "1 Box" },
            { sNo: 153, nameEng: "50 cm Glittering Sparklers", nameTam: "50 செமி கிலிடரிங் கம்பி", rate: 200.00, per: "1 Box" },
            { sNo: 154, nameEng: "75 cm Electric Sparklers", nameTam: "75 செமி எலக்ட்ரிக் கம்பி", rate: 350.00, per: "1 Box" }
          ]
        },
        {
          categoryEng: "GIFTBOX",
          categoryTam: "கிப்ட் பாக்ஸ்",
          headerPer: "",
          items: [
            { sNo: 155, nameEng: "30 Items", nameTam: "30 ஐட்டம்ஸ்", rate: 450.00, per: "1 Box" },
            { sNo: 156, nameEng: "40 Items", nameTam: "40 ஐட்டம்ஸ்", rate: 650.00, per: "1 Box" },
            { sNo: 157, nameEng: "50 Items", nameTam: "50 ஐட்டம்ஸ்", rate: 900.00, per: "1 Box" },
            { sNo: 158, nameEng: "60 items", nameTam: "60 ஐட்டம்ஸ்", rate: 1200.00, per: "1 Box" }
          ]
        }
      ]
    }
  ]
};
