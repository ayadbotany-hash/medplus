"use client"

import { useState, useEffect } from "react"

// مصفوفة فريدة بدون تكرار للأسماء العلمية
const GLOBAL_GENERIC_DRUGS = Array.from(new Set([
  // أدوية الحقن والإبر الفعالة
  "Meropenem", "Ceftriaxone", "Cefotaxime", "Ceftazidime", "Cefepime", "Cefazolin", 
  "Amikacin", "Gentamicin", "Tobramycin", "Vancomycin", "Teicoplanin", "Colistin",
  "Imipenem", "Ertapenem", "Piperacillin", "Tazobactam", "Ampicillin", "Sulbactam",
  "Metronidazole", "Ciprofloxacin", "Levofloxacin", "Moxifloxacin", "Fluconazole",
  "Voriconazole", "Caspefungin", "Anidulafungin", "Amphotericin B", "Aciclovir",
  
  // الحقن المسكنة والمهدئة
  "Diclofenac", "Ketorolac", "Piroxicam", "Paracetamol", "Tramadol", "Morphine",
  "Fentanyl", "Pethidine", "Buprenorphine", "Ondansetron", "Metoclopramide",
  "Hyoscine butylbromide", "Dexamethasone", "Hydrocortisone", "Methylprednisolone",
  "Prednisolone", "Betamethasone", "Triamcinolone",
  
  // أدوية الأعصاب والتشنجات والقلب
  "Levetiracetam", "Valproate sodium", "Phenytoin", "Phenobarbital", "Diazepam",
  "Midazolam", "Lorazepam", "Haloperidol", "Amiodarone", "Atropine", "Adrenaline",
  "Epinephrine", "Norepinephrine", "Dopamine", "Dobutamine", "Furosemide",
  "Heparin", "Enoxaparin", "Fondaparinux", "Insulin human", "Insulin glargine",
  
  // الأسماء العلمية العامة (A-Z)
  "Abacavir", "Abiraterone", "Acamprosate", "Acarbose", "Acebutolol", "Aceclofenac",
  "Acetazolamide", "Acetylcysteine", "Acitretin", "Adalimumab", "Adapalene", "Adefovir",
  "Adenosine", "Afatinib", "Albendazole", "Albuterol", "Alectinib", "Alendronate",
  "Alfacalcidol", "Alfuzosin", "Aliskiren", "Allopurinol", "Alprazolam", "Alprostadil",
  "Amantadine", "Ambrisentan", "Amiloride", "Aminophylline", "Amitriptyline", "Amlodipine",
  "Amorolfine", "Amoxicillin", "Anagrelide", "Anastrozole", "Aripiprazole", "Artemether",
  "Artesunate", "Ascorbic acid", "Asenapine", "Aspirin", "Atazanavir", "Atenolol",
  "Atomoxetine", "Atorvastatin", "Azacitidine", "Azathioprine", "Azelaic acid",
  "Azelastine", "Azithromycin", "Aztreonam", "Baclofen", "Baricitinib", "Beclomethasone",
  "Bedaquiline", "Benazepril", "Bendamustine", "Benzoyl peroxide", "Betaxolol",
  "Bicalutamide", "Bictegravir", "Bimatoprost", "Bisacodyl", "Bisoprolol", "Bleomycin",
  "Bortezomib", "Bosentan", "Bosutinib", "Brimonidine", "Brinzolamide", "Brivaracetam",
  "Bromazepam", "Bromocriptine", "Budesonide", "Bumetanide", "Bupropion", "Buspirone",
  "Cabazitaxel", "Cabergoline", "Cabozantinib", "Calcipotriol", "Calcitonin", "Calcitriol",
  "Calcium carbonate", "Candesartan", "Capecitabine", "Captopril", "Carbamazepine",
  "Carbidopa", "Carbimazole", "Carboplatin", "Carfilzomib", "Carisoprodol", "Carvedilol",
  "Cefaclor", "Cefadroxil", "Cefdinir", "Cefixime", "Cefpodoxime", "Cefprozil",
  "Celecoxib", "Cephalexin", "Cetirizine", "Cetuximab", "Chlorambucil", "Chloramphenicol",
  "Chlordiazepoxide", "Chlorhexidine", "Chloroquine", "Chlorpheniramine", "Chlorpromazine",
  "Chlorthalidone", "Cholecalciferol", "Ciclesonide", "Cilostazol", "Cimetidine",
  "Cinacalcet", "Cinnarizine", "Cisplatin", "Citalopram", "Clarithromycin", "Clindamycin",
  "Clobetasol", "Clobazam", "Clomifene", "Clomipramine", "Clonazepam", "Clonidine",
  "Clopidogrel", "Clotrimazole", "Clozapine", "Colchicine", "Colesevelam", "Crizotinib",
  "Cyclobenzaprine", "Cyclophosphamide", "Cycloserine", "Cyclosporine", "Cyproheptadine",
  "Cytarabine", "Dabigatran", "Dabrafenib", "Dacarbazine", "Daclatasvir", "Dapagliflozin",
  "Dapoxetine", "Dapsone", "Daptomycin", "Daratumumab", "Darunavir", "Dasatinib",
  "Daunorubicin", "Deferasirox", "Deferiprone", "Deflazacort", "Degarelix", "Denosumab",
  "Desloratadine", "Desmopressin", "Desogestrel", "Dexmedetomidine", "Dexmethylphenidate",
  "Dextromethorphan", "Diazoxide", "Dicyclomine", "Dienogest", "Digoxin", "Diltiazem",
  "Dimenhydrinate", "Dimethyl fumarate", "Diphenhydramine", "Dipyridamole", "Disulfiram",
  "Docetaxel", "Docusate", "Domperidone", "Donepezil", "Doxazosin", "Doxepin",
  "Doxorubicin", "Doxycycline", "Dronedarone", "Drospirenone", "Duloxetine", "Dutasteride",
  "Dydrogesterone", "Ebastine", "Econazole", "Eculizumab", "Edoxaban", "Efavirenz",
  "Eletriptan", "Eltrombopag", "Empagliflozin", "Enalapril", "Enzalutamide", "Ephedrine",
  "Epirubicin", "Eplerenone", "Eprosartan", "Ergocalciferol", "Ergotamine", "Erlotinib",
  "Erythromycin", "Escitalopram", "Esmolol", "Esomeprazole", "Estradiol", "Eszopiclone",
  "Etanercept", "Ethambutol", "Ethinylestradiol", "Ethosuximide", "Etomidate", "Etoposide",
  "Etoricoxib", "Everolimus", "Exemestane", "Exenatide", "Ezetimibe", "Famciclovir",
  "Famotidine", "Febuxostat", "Felodipine", "Fenofibrate", "Fenoldopam", "Ferrous sulfate",
  "Fesoterodine", "Fexofenadine", "Filgrastim", "Finasteride", "Fingolimod", "Flecainide",
  "Flucytosine", "Fludarabine", "Fludrocortisone", "Flumazenil", "Fluocinolone",
  "Fluorouracil", "Fluoxetine", "Flupentixol", "Fluphenazine", "Flurazepam", "Flurbiprofen",
  "Flutamide", "Fluticasone", "Fluvastatin", "Fluvoxamine", "Folic acid", "Formoterol",
  "Fosinopril", "Fulvestrant", "Fusidic acid", "Gabapentin", "Galantamine", "Ganciclovir",
  "Gefitinib", "Gemcitabine", "Gemfibrozil", "Gliclazide", "Glimepiride", "Glipizide",
  "Glucagon", "Glycopyrrolate", "Goserelin", "Granisetron", "Griseofulvin", "Guaifenesin",
  "Hydralazine", "Hydrochlorothiazide", "Hydromorphone", "Hydroxychloroquine",
  "Hydroxyurea", "Hydroxyzine", "Hyoscine", "Ibrutinib", "Ibuprofen", "Ibadronic acid",
  "Idarubicin", "Ifosfamide", "Imatinib", "Imipramine", "Imiquimod", "Infliximab",
  "Ingenol mebutate", "Ipratropium", "Irbesartan", "Irinotecan", "Isoniazid", "Isosorbide dinitrate",
  "Isosorbide mononitrate", "Isotretinoin", "Itraconazole", "Ivermectin", "Ivabradine",
  "Ketoconazole", "Ketoprofen", "Ketotifen", "Labetalol", "Lacosamide", "Lactulose",
  "Lamivudine", "Lamotrigine", "Lansoprazole", "Lapatinib", "Latanoprost", "Leflunomide",
  "Lenvatinib", "Letrozole", "Leucovorin", "Leuprolide", "Levocetirizine", "Levonorgestrel",
  "Levothyroxine", "Lidocaine", "Linagliptin", "Linezolid", "Liothyronine", "Liraglutide",
  "Lisdexamfetamine", "Lisinopril", "Lithium", "Loperamide", "Lopinavir", "Loratadine",
  "Lorlatinib", "Losartan", "Loxapine", "Magnesium sulfate", "Mannitol", "Maprotiline",
  "Mebendazole", "Meclizine", "Medroxyprogesterone", "Mefenamic acid", "Mefloquine",
  "Megestrol", "Meloxicam", "Melphalan", "Memantine", "Mercaptopurine", "Mesalamine",
  "Mesna", "Metformin", "Methadone", "Methotrexate", "Methyldopa", "Methylphenidate",
  "Metoprolol", "Mianserin", "Miconazole", "Mifepristone", "Milrinone", "Minocycline",
  "Minoxidil", "Mirtazapine", "Misoprostol", "Mitomycin", "Mitoxantrone", "Modafinil",
  "Moexipril", "Montelukast", "Mupirocin", "Mycophenolate mofetil", "Nabumetone",
  "Nadolol", "Naftifine", "Naloxone", "Naltrexone", "Naproxen", "Naratriptan",
  "Natalizumab", "Nebivolol", "Neomycin", "Neostigmine", "Nevirapine", "Nicardipine",
  "Nicorandil", "Nicotine", "Nifedipine", "Nilotinib", "Nimodipine", "Nitrazepam",
  "Nitrofurantoin", "Nitroglycerin", "Nitroprusside", "Norethindrone", "Norfloxacin",
  "Nortriptyline", "Nystatin", "Octreotide", "Ofloxacin", "Olanzapine", "Olaparib",
  "Olmesartan", "Olopatadine", "Omeprazole", "Oseltamivir", "Osimertinib", "Oxaliplatin",
  "Oxazepam", "Oxcarbazepine", "Oxybutynin", "Oxycodone", "Oxymetazoline", "Oxytocin",
  "Paclitaxel", "Paliperidone", "Palonosetron", "Pamidronate", "Pancuronium",
  "Pantoprazole", "Paricalcitol", "Paroxetine", "Pazopanib", "Pembrolizumab", "Pemetrexed",
  "Penicillamine", "Penicillin V", "Penicillin G", "Pentazocine", "Pentoxifylline",
  "Perindopril", "Permethrin", "Perphenazine", "Phentolamine", "Phenylephrine",
  "Physostigmine", "Pilocarpine", "Pimozide", "Pindolol", "Pioglitazone", "Piracetam",
  "Plerixafor", "Polymyxin B", "Posaconazole", "Potassium chloride", "Prazosin",
  "Pregabalin", "Prilocaine", "Primaquine", "Primidone", "Procarbazine", "Procyclidine",
  "Progesterone", "Promethazine", "Propafenone", "Propofol", "Propranolol", "Propylthiouracil",
  "Protamine", "Pyrazinamide", "Pyridostigmine", "Pyridoxine", "Pyrimethamine",
  "Quetiapine", "Quinapril", "Quinidine", "Quinine", "Rabeprazole", "Raloxifene",
  "Raltegravir", "Ramipril", "Ranibizumab", "Ranitidine", "Rasagiline", "Regorafenib",
  "Remifentanil", "Repaglinide", "Reserpine", "Rifabutin", "Rifampin", "Riluzole",
  "Risedronate", "Risperidone", "Ritonavir", "Rituximab", "Rivaroxaban", "Rivastigmine",
  "Rizatriptan", "Rocuronium", "Ropinirole", "Ropivacaine", "Rosuvastatin", "Rupatadine",
  "Salbutamol", "Salmeterol", "Salicylic acid", "Saxagliptin", "Scopolamine", "Secnidazole",
  "Selegiline", "Sertaconazole", "Sertraline", "Sevelamer", "Sevoflurane", "Sildenafil",
  "Silodosin", "Silver sulfadiazine", "Simvastatin", "Sirolimus", "Sitagliptin",
  "Sodium valproate", "Solifenacin", "Somatropin", "Sorafenib", "Sotalol", "Spironolactone",
  "Streptokinase", "Streptomycin", "Sucralfate", "Sufentanil", "Sulfacetamide",
  "Sulfadiazine", "Sulfamethoxazole", "Sulfasalazine", "Sulpiride", "Sumatriptan",
  "Sunitinib", "Tacrolimus", "Tadalafil", "Tafluprost", "Tamoxifen", "Tamsulosin",
  "Tapentadol", "Tazarotene", "Telmisartan", "Temazepam", "Temozolomide", "Tenecteplase",
  "Tenofovir", "Terazosin", "Terbinafine", "Terbutaline", "Teriparatide", "Testosterone",
  "Tetrabenazine", "Tetracycline", "Thalidomide", "Theophylline", "Thiamine", "Thiopental",
  "Thioridazine", "Ticagrelor", "Ticlopidine", "Tigecycline", "Timolol", "Tinidazole",
  "Tiotropium", "Tizanidine", "Tocilizumab", "Tofacitinib", "Tolterodine", "Topiramate",
  "Topotecan", "Torsemide", "Trandolapril", "Tranexamic acid", "Trastuzumab", "Travoprost",
  "Trazodone", "Tretinoin", "Trimethoprim", "Trimipramine", "Triptorelin", "Tropicamide",
  "Tropisetron", "Ursodeoxycholic acid", "Valacyclovir", "Valganciclovir", "Valproic acid",
  "Valsartan", "Vardenafil", "Varenicline", "Vecuronium", "Venlafaxine", "Verapamil",
  "Vinblastine", "Vincristine", "Vinorelbine", "Voriconazole", "Vortioxetine", "Warfarin",
  "Zalcitabine", "Zaleplon", "Zanamivir", "Zidovudine", "Ziprasidone", "Zoledronic acid",
  "Zolmitriptan", "Zolpidem", "Zonisamide", "Zuclopenthixol"
]))

export default function RxNormSearch({
  onSelectDrug,
  placeholder = "ابحث بالاسم العلمي (Levetiracetam, Meropenem, Pregabalin)..."
}: {
  onSelectDrug?: (drugName: string) => void
  placeholder?: string
}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.trim().length >= 2) {
      const cleanQuery = query.trim().toLowerCase()
      const matches = GLOBAL_GENERIC_DRUGS.filter(drug =>
        drug.toLowerCase().includes(cleanQuery)
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [query])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        dir="auto"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setQuery(item)
                setSuggestions([])
                if (onSelectDrug) onSelectDrug(item)
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm border-b last:border-none text-left"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}