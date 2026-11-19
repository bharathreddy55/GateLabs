export const group2MainsSource = 'https://bloomappsc.com/documents/Group_II_Detailed_Notification_37_2026.pdf';
const officialIndex = 'https://portal-psc.ap.gov.in/HomePages/KeysToPapers';
const common = {
  version: '37/2026',
  count: 150,
  marks: 150,
  minutes: 150,
  penalty: 1/3,
  date: null,
  countdownName: 'APPSC Group 2 Mains',
  source: group2MainsSource,
  checked: '2026-11-19',
  note: 'Objective computer-based recruitment test. Each paper is a separate sitting worth 150 marks. The two papers total 300 marks. APPSC will announce the Mains date separately.'
};

export const GROUP2_MAINS = {
  'group2-mains-1': {
    ...common,
    name: 'APPSC Group 2 Mains · Paper I',
    route: 'group2/mains',
    sections: [
      ['Social and Cultural History of Andhra Pradesh', 75, [
        'Prehistory, Satavahanas and Ikshvakus, Vishnukundins, Eastern Chalukyas of Vengi and Andhra Cholas. Society, economy, religion, Telugu language, literature, art and architecture',
        'Andhradesa from the 11th to the 16th century. Major and minor dynasties, social and religious life, economy, Telugu literature, art and architecture',
        'European trade centres, Company rule and 1857 in Andhra. Social reform, Justice Party and Self-Respect movement, nationalism (1885–1947), socialist, communist, anti-zamindari and peasant movements, poetry, theatre, revolutionary literature and women',
        'Andhra movement and Andhra Mahasabhas. Leaders, press, libraries, folk and tribal culture, and the formation of Andhra State in 1953',
        'Visalandhra, States Reorganisation Commission, Gentlemen’s Agreement and the formation of Andhra Pradesh. Social and cultural developments from 1956 to 2014'
      ].join('; ')],
      ['Indian Constitution', 75, [
        'Constitutional development, nature and features, Preamble, fundamental rights, directive principles, duties, amendments and basic structure',
        'Legislature, parliamentary executive and judiciary. Unicameral and bicameral legislatures, judicial review and judicial activism',
        'Union–state legislative, executive, administrative and fiscal relations. Constitutional bodies, human rights commissions, RTI, Lokpal and Lokayukta',
        'Federal and unitary features, Rajamannar, Sarkaria and Punchhi commissions. Parties and recognition, elections, electoral reforms and anti-defection',
        'Decentralisation and the Community Development Programme. Balwant Rai Mehta and Ashok Mehta committees, 73rd and 74th amendments and implementation'
      ].join('; ')]
    ],
    papers: [
      ['2025 Mains · Paper I, Series A with final key (mirror)', 'https://bloomappsc.com/documents/G2_MAINS_2025_P1_SeriesA_FINAL_KEY.pdf'],
      ['2025 Mains · all booklet series and final keys (mirrors)', 'https://bloomappsc.com/exam/appsc-group-2-mains-2025-question-papers.html'],
      ['APPSC official answer-key index', officialIndex]
    ]
  },
  'group2-mains-2': {
    ...common,
    name: 'APPSC Group 2 Mains · Paper II',
    route: 'group2/mains/paper-2',
    sections: [
      ['Indian and Andhra Pradesh Economy', 75, [
        'National income measurement, sectoral income and employment, growth and development, planning, 1991 reforms, financial decentralisation and NITI Aayog',
        'Money and supply measures, RBI and monetary policy, banking and credit, inflation, fiscal responsibility, budget and deficits, taxes and GST, balance of payments and FDI',
        'Indian agriculture, crop patterns, productivity, farm credit and marketing, MSP, procurement and distribution. Industry, 1991 policy, disinvestment, business environment, industrial sickness, services and IT/ITES',
        'Andhra Pradesh GSDP, sectoral contributions and per-capita income. State budget, own revenues, expenditure, debt and interest, central transfers and externally aided projects',
        'AP agriculture and allied sectors, horticulture, livestock, fisheries and forestry. Rural credit and cooperatives, markets, industry and incentives, single-window approvals, MSMEs, corridors, services, electronics and IT policy'
      ].join('; ')],
      ['Science and Technology', 75, [
        'Science and innovation policies, missions and emerging technologies. Indian space missions and launches, DRDO and the IGMDP at institutional level, ICT, Digital India, e-governance, cyber policy, nuclear energy and radioisotope applications',
        'Energy demand and capacity, national energy and biofuel policy, Bharat Stage standards, renewable and non-renewable sources, and renewable energy programmes',
        'Ecology, ecosystems, biodiversity, hotspots, losses, conservation approaches, wildlife law, CITES, endangered species, biosphere reserves, national efforts and international agreements',
        'Solid waste types and management, pollution sources and control, environmental regulation, environmental assessment of transgenics, sustainable agricultural technology and bioremediation',
        'Global warming, acid rain, ozone depletion, ocean acidification, climate agreements and India’s role. Sustainable development, SDGs, disease burden, outbreak preparedness, health delivery and public health programmes'
      ].join('; ')]
    ],
    papers: [
      ['2025 Mains · Paper II, Series A with final key (mirror)', 'https://bloomappsc.com/documents/G2_MAINS_2025_P2_SeriesA_FINAL_KEY.pdf'],
      ['2025 Mains · all booklet series and final keys (mirrors)', 'https://bloomappsc.com/exam/appsc-group-2-mains-2025-question-papers.html'],
      ['APPSC official answer-key index', officialIndex]
    ]
  }
};

export function group2StageNav(id) {
  if (id !== 'group2' && !Object.hasOwn(GROUP2_MAINS,id)) return '';
  const isPrelims = id === 'group2';
  return `<nav class="group2-stage-nav" aria-label="Group 2 stage">
    <a class="ui-button ${isPrelims?'primary':''}" href="#/group2" ${isPrelims?'aria-current="page"':''}>Prelims</a>
    <a class="ui-button ${isPrelims?'':'primary'}" href="#/group2/mains" ${isPrelims?'':'aria-current="true"'}>Mains</a>
  </nav>${isPrelims?'':`<nav class="group2-stage-nav" aria-label="Mains paper">
    ${Object.entries(GROUP2_MAINS).map(([key,paper],index)=>
      `<a class="ui-button ${key===id?'primary':''}" href="#/${paper.route}" ${key===id?'aria-current="page"':''}>Paper ${index===0?'I':'II'}</a>`).join('')}
  </nav>`}`;
}
