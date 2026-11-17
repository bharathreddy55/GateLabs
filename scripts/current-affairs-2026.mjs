// Verified 16 November 2026. Facts refer to the named announcement/year, not future outcomes.
const AP='https://apfinance.gov.in/...Bud@et26-27/documents/SpeechEnglish.pdf';
const UNION='https://www.pib.gov.in/PressReleasePage.aspx?PRID=2221455&lang=3&reg=3';
const DOCK='https://www.isro.gov.in/spadex_docking.html';
const COP='https://unfccc.int/sites/default/files/resource/cp2025_12_adv.pdf';
const G20='https://g20.org/wp-content/uploads/2025/11/2025-G20-Summit-Declaration.pdf';
// [question, correct answer, three distractors, explanation, source]
export const currentAffairs2026 = [
 ['Who presented Andhra Pradesh’s 2026–27 finance budget?','Payyavula Keshav','Nirmala Sitharaman','Piyush Goyal','S. Jaishankar','The state finance portal names Keshav.','https://apfinance.gov.in/...Bud@et26-27/'],
 ['AP’s 2026–27 budget proposed total expenditure of approximately what?','₹3,32,205 crore','₹2,32,205 crore','₹4,32,205 crore','₹1,32,205 crore','See budget speech, paragraph 86.',AP],
 ['AP’s 2026–27 budget estimated capital expenditure at what amount?','₹53,915 crore','₹23,915 crore','₹83,915 crore','₹13,915 crore','Paragraph 86 gives this estimate.',AP],
 ['AP’s 2026–27 estimated revenue expenditure was what?','₹2,56,143 crore','₹1,56,143 crore','₹3,56,143 crore','₹56,143 crore','This is revenue, not capital expenditure.',AP],
 ['What fiscal-deficit/GSDP ratio did AP’s 2026–27 budget estimate?','3.84%','1.11%','5.11%','2.33%','Paragraph 86 distinguishes fiscal and revenue deficits.',AP],
 ['AP’s 2026–27 speech reports Thalliki Vandanam annual assistance per child of what?','₹15,000','₹5,000','₹25,000','₹50,000','Paragraph 32 reports the programme amount.',AP],
 ['Which AP mobility scheme began on 15 August 2025?','Stree Shakti','SpaDeX','Biopharma SHAKTI','Bharat-VISTAAR','Paragraph 77 records its introduction.',AP],
 ['The AP education reform called LEAP spans which educational range?','KG to PG','Only postgraduate research','Only preschool','Only engineering diplomas','The speech describes a KG-to-PG model.',AP],
 ['Which listed state was included in Union Budget 2026–27 rare-earth corridors?','Andhra Pradesh','Punjab','Haryana','Himachal Pradesh','AP is among the four named states.',UNION],
 ['The third launch pad approved in January 2025 is at which AP space centre?','Satish Dhawan Space Centre, Sriharikota','Vikram Sarabhai Space Centre, Thiruvananthapuram','UR Rao Satellite Centre, Bengaluru','Space Applications Centre, Ahmedabad','ISRO’s January summary records the approval.','https://www.isro.gov.in/media_isro/pdf/Monthly_summary/Montlhly_summary_January2025.pdf'],
 ['Union Budget 2026–27 estimated total spending at approximately what?','₹53.5 lakh crore','₹43.5 lakh crore','₹63.5 lakh crore','₹33.5 lakh crore','This is the published budget estimate.',UNION],
 ['What fiscal-deficit/GDP ratio did Union Budget 2026–27 estimate?','4.3%','4.4%','3.0%','5.6%','4.4% referred to the preceding revised estimate.',UNION],
 ['Union Budget 2026–27 proposed public capital expenditure of what?','₹12.2 lakh crore','₹2.2 lakh crore','₹22.2 lakh crore','₹7.2 lakh crore','The infrastructure announcement gives ₹12.2 lakh crore.',UNION],
 ['Which semiconductor initiative was announced in Union Budget 2026–27?','India Semiconductor Mission 2.0','Operation Flood','Project Tiger','National Solar Mission only','ISM 2.0 targets the semiconductor ecosystem.',UNION],
 ['Biopharma SHAKTI’s announced five-year outlay in Budget 2026–27 was what?','₹10,000 crore','₹1,000 crore','₹50,000 crore','₹500 crore','The announcement specifies five-year funding.',UNION],
 ['Budget 2026–27’s Bharat-VISTAAR is principally what?','A multilingual agricultural AI tool','A lunar lander','A naval submarine','A sporting league','It integrates agricultural information using AI.',UNION],
 ['ISRO first docked the SpaDeX satellites on which date?','16 January 2025','16 January 2024','13 March 2024','30 December 2025','The ISRO docking release gives this date.',DOCK],
 ['Successful SpaDeX docking made India which nation to demonstrate space docking?','Fourth','First','Second','Tenth','ISRO’s 2025 achievements summary records fourth place.','https://www.isro.gov.in/ISRO_EN/Achievements_Department_of_Space_2025.html'],
 ['Which two satellites performed the first SpaDeX docking?','SDX-01 and SDX-02','INSAT-1A and INSAT-1B','Chandrayaan-1 and Mangalyaan','Aryabhata and Rohini','These identifiers appear in ISRO’s release.',DOCK],
 ['ISRO’s first successful SpaDeX undocking occurred on which date?','13 March 2025','13 March 2024','23 August 2025','6 January 2026','The official undocking update records the date.','https://www.isro.gov.in/ISRO_EN/spadex_undocking_successful.html'],
 ['Which city hosted COP30 in 2025?','Belém','Baku','Dubai','Glasgow','The UNFCCC proceedings identify Belém.',COP],
 ['COP30’s 2025 host country was which?','Brazil','Azerbaijan','Egypt','United Arab Emirates','Belém is the Brazilian host city.',COP],
 ['Who was elected president of COP30?','André Aranha Corrêa do Lago','Mukhtar Babayev','António Guterres','Jim Skea','Paragraph 2 records the election.',COP],
 ['Which action plan appears as decision 7/CP.30?','Belém gender action plan','Montreal aviation action plan','Kyoto fisheries action plan','Paris space action plan','The proceedings list the decision by this name.',COP],
 ['According to its proceedings, COP30 actually ran over which dates?','10–22 November 2025','1–5 January 2025','10–22 November 2024','1–15 December 2026','The report records the actual closing date.',COP],
 ['Which city hosted the 2025 G20 leaders’ summit?','Johannesburg','Pretoria','Cape Town','Durban','The leaders’ declaration identifies Johannesburg.',G20],
 ['Which country held the 2025 G20 summit presidency?','South Africa','Brazil','India','Indonesia','The declaration identifies the South African presidency.',G20],
 ['The 2025 G20 summit was the first held on which continent?','Africa','Asia','Europe','South America','The declaration highlights this first.',G20],
 ['The Johannesburg G20 summit took place on which dates?','22–23 November 2025','22–23 November 2024','1–2 February 2026','15–16 August 2025','These dates appear in the declaration.',G20],
 ['Which three themes framed South Africa’s 2025 G20 presidency?','Solidarity, equality and sustainability','Isolation, exclusion and extraction','War, tariffs and annexation','Speed, spectacle and secrecy','These are the declaration’s three named pillars.',G20]
];
