import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {

    translation: {
    complaintNumber: "Complaint",

    loadingComplaint: "Loading complaint…",

    confirmationPhotoRequired: "Please add a photo of the repaired spot before confirming.",
    couldNotConfirmCompletion: "Couldn't confirm completion.",

    reopenReasonPrompt: "What's still wrong? This sends it back to the department.",
    couldNotReopenComplaint: "Couldn't reopen this complaint.",

    reported: "Reported",
    reportedConditionAlt: "Condition when reported",

    confirmedRepaired: "Confirmed repaired",
    repairedConditionAlt: "Condition after repair",

    departmentNote: "Department note:",

    departmentSaysFixed: "The department says this is fixed",
    confirmRepairDescription: "Take a photo of the repaired spot to confirm it yourself — this is the only way the complaint gets closed.",

    optionalRemarks: "Optional remarks",

    confirmFixed: "Confirm it's fixed",
    notFixedReopen: "Not fixed — reopen",

    timeline: "Timeline",
    changedBy: "by",
    chatbotWelcome:
      "Hi! I'm the Nagrik Seva assistant. I can help you understand the portal, find the right login, register, raise a complaint, or track an existing complaint.",

    needHelp: "Need help?",

    chatbotName: "Nagrik Seva Assistant",

    chatbotPlaceholder:
      "Ask me anything about the portal…",

    send: "Send",

    typing: "Typing…",

    takeMeThere: "Take me there",

    close: "Close",

    chatbotConnectionError:
      "Sorry, I couldn't reach the assistant just now. Please try again.",
    raiseComplaintDescription:
      "It gets routed straight to the right department based on the category you pick.",

    issueInFewWords:
      "What's the issue, in a few words",

    issueTitlePlaceholder:
      "e.g. Large pothole on main road",

    department:
      "Department",

    location:
      "Location",

    locationPlaceholder:
      "e.g. Near Shivaji Chowk, Ward 5",

    describeIssue:
      "Describe what's happening",

    descriptionPlaceholder:
      "The more detail you give, the faster the department can act on it.",

    photoOfIssue:
      "Photo of the issue",

    submitting:
      "Submitting…",

    submitComplaint:
      "Submit complaint",

    submitComplaintError:
      "Couldn't submit your complaint. Please try again.",

    illegalConstruction:
      "Illegal construction",

    other:
      "Other",
      commissionerOverview: "Commissioner overview",
      commissionerOverviewDescription: "Every department, every officer, every complaint — in one place.",
      overview: "Overview",
      departmentsAndOfficers: "Departments & Officers",
      allComplaints: "All Complaints",
      totalComplaints: "Total complaints",
      departments: "Departments",
      officers: "Officers",
      byStatus: "By status",
      byDepartment: "By department",
      complaint: "complaint",
      complaints: "complaints",
      loadingOversightDashboard: "Loading oversight dashboard…",

      addDepartment: "Add a department",
      name: "Name",
      departmentNamePlaceholder: "e.g. Roads & Infrastructure",
      category: "Category",
      contactEmail: "Contact email",

      provisionOfficerAccount: "Provision an officer account",
      temporaryPassword: "Temporary password",
      selectDepartment: "Select department…",
      createOfficer: "Create officer",

      departmentAdded: "Department added.",
      couldNotAddDepartment: "Could not add department.",
      pickDepartmentForOfficer: "Pick a department for this officer.",
      officerAccountCreated: "Officer account created.",
      couldNotCreateOfficer: "Could not create officer account.",

      noOfficerAccounts: "No officer accounts yet — create one above.",
      noComplaintsInSystem: "No complaints in the system yet.",
    departmentQueue: "Department Queue",
    oversightDashboard: "Oversight Dashboard",
    citizenAccount: "Citizen account",
    departmentOfficer: "Department Officer",
    commissioner: "Commissioner",
    logout: "Log out",
    governmentPortal: "Government Portal",
    statusPending: "Pending",
    statusAssigned: "Assigned",
    statusInProgress: "In progress",
    statusAwaitingConfirmation: "Awaiting your confirmation",
    statusCompleted: "Completed",
    statusReopened: "Reopened",
    myComplaints: "My complaints",

    complaintsWaitingConfirmation:
      "{{count}} complaint is waiting on your confirmation.",

    complaintsTrackedDescription:
      "Every complaint you raise, tracked from report to repair.",

    raiseComplaint: "Raise a complaint",

    loadingComplaints: "Loading your complaints…",

    noComplaints:
      "You haven't raised any complaints yet.",

    raiseFirstComplaint:
      "Raise your first complaint",

    unassigned:
      "Unassigned",

    complaintNumber:
      "Complaint",
    governmentPortal: "Government Portal",
    staffSignIn: "Staff sign in",
    staffSignInDescription:
      "For department officers and commissioner accounts.",
    officialEmail: "Official email",
    signingIn: "Signing in…",
    signIn: "Sign in",
    governmentLoginOnly:
      "This login is for government staff accounts. Use the resident login instead.",
    noGovernmentAccount:
      "Don't have an account? Contact your commissioner's office — staff accounts aren't self-registered.",
    residentAccount: "Resident account",
    registerDescription: "Set up citizen access to report civic issues.",
    fullName: "Full name",
    phoneNumber: "Phone number",
    creatingAccount: "Creating account…",
    alreadyRegistered: "Already registered?",
    registerError: "Could not create your account. Try again.",
    back: "Back",
    residentLogin: "Resident login",
    loginDescription: "Track your complaints and raise new ones.",
    email: "Email",
    password: "Password",
    loggingIn: "Logging in…",
    newHere: "New here?",
    createAccount: "Create an account",
    residentLoginOnly:
      "This is the resident login. Use the government login page for staff accounts.",
    loginError:
      "That email and password don't match our records.",
    workForDepartment: "Work for a department?",
    governmentPortalDescription:
      "Officers and commissioners sign in through a dedicated government portal — accounts are provisioned by your office, not self-registered.",
    governmentLogin: "Government login",

    complaintsAutomaticallyRouted:
      "Complaints are automatically routed based on the category you choose.",

    publicGrievancePortal: "Public Grievance Portal",

    footerDescription:
      "Built for residents and the departments that serve them.",

    // Departments
    roads: "Roads",
    waterSupply: "Water Supply",
    electricity: "Electricity",
    sanitationGarbage: "Sanitation & Garbage",
    streetLighting: "Street Lighting",
    drainageSewage: "Drainage & Sewage",
    publicHealth: "Public Health",
    parksEnvironment: "Parks & Environment",
      // Language
      language: "Language",
      english: "English",
      marathi: "मराठी",
      hindi: "हिन्दी",

      // Common
      welcome: "Welcome to Complaint Portal",
      login: "Login",
      register: "Register",
      logout: "Logout",
      home: "Home",
      dashboard: "Dashboard",
      complaints: "Complaints",
      raiseComplaint: "Raise Complaint",
      trackComplaint: "Track Complaint",

      username: "Username",
      password: "Password",
      email: "Email",
      phone: "Phone Number",

      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      back: "Back",

      loading: "Loading...",
      success: "Success",
      error: "Something went wrong",

      // Landing Page
      heroTitle: "Report it. Track it. Confirm it fixed.",

      heroDescription:
        "Nagrik Seva connects residents directly with their local government departments — every complaint routed, tracked, and closed only when you say it's actually resolved.",

      reportIssue: "Report an issue",

      trackExistingComplaint: "Track an existing complaint",

      howItWorks: "How it works",

      reportTheIssue: "Report the issue",

      reportIssueDescription:
        "Describe what's wrong, add a photo, and it's automatically routed to the right department.",

      trackItOpenly: "Track it openly",

      trackItOpenlyDescription:
        "Follow every status change in real time — pending, assigned, in progress, resolved.",

      confirmItYourself: "Confirm it yourself",

      confirmItYourselfDescription:
        "When the department says it's fixed, you have the final word — upload a photo and close it yourself.",

      everyDepartmentOnePortal: "Every department, one portal"
    }
  },

  mr: {
    translation: {
    chatbotWelcome:
      "नमस्कार! मी नागरिक सेवा सहाय्यक आहे. पोर्टल समजून घेणे, योग्य लॉगिन शोधणे, नोंदणी करणे, तक्रार नोंदवणे किंवा विद्यमान तक्रारीचा मागोवा घेण्यात मी मदत करू शकतो.",

    needHelp: "मदत हवी आहे?",

    chatbotName: "नागरिक सेवा सहाय्यक",

    chatbotPlaceholder:
      "पोर्टलबद्दल काहीही विचारा…",

    send: "पाठवा",

    typing: "टाइप करत आहे…",

    takeMeThere: "मला तिथे घेऊन चला",

    close: "बंद करा",

    chatbotConnectionError:
      "माफ करा, मी सध्या सहाय्यकाशी संपर्क साधू शकलो नाही. कृपया पुन्हा प्रयत्न करा.",
    complaintNumber: "तक्रार",

    loadingComplaint: "तक्रार लोड होत आहे…",

    confirmationPhotoRequired: "पुष्टी करण्यापूर्वी दुरुस्त केलेल्या ठिकाणाचा फोटो जोडा.",
    couldNotConfirmCompletion: "पूर्णत्वाची पुष्टी करता आली नाही.",

    reopenReasonPrompt: "अजून काय समस्या आहे? यामुळे तक्रार पुन्हा विभागाकडे पाठवली जाईल.",
    couldNotReopenComplaint: "ही तक्रार पुन्हा उघडता आली नाही.",

    reported: "नोंदवलेले",
    reportedConditionAlt: "नोंदवतानाची स्थिती",

    confirmedRepaired: "दुरुस्तीची पुष्टी",
    repairedConditionAlt: "दुरुस्तीनंतरची स्थिती",

    departmentNote: "विभागाची नोंद:",

    departmentSaysFixed: "विभागाने ही समस्या सोडवली असल्याचे सांगितले आहे",
    confirmRepairDescription: "स्वतः पुष्टी करण्यासाठी दुरुस्त केलेल्या ठिकाणाचा फोटो घ्या — तक्रार बंद करण्याचा हा एकमेव मार्ग आहे.",

    optionalRemarks: "पर्यायी नोंद",

    confirmFixed: "दुरुस्तीची पुष्टी करा",
    notFixedReopen: "दुरुस्ती झाली नाही — पुन्हा उघडा",

    timeline: "घडामोडींचा क्रम",
    changedBy: "द्वारे",
    commissionerOverview: "आयुक्तांचा आढावा",
    commissionerOverviewDescription: "प्रत्येक विभाग, प्रत्येक अधिकारी, प्रत्येक तक्रार — सर्व काही एका ठिकाणी.",
    overview: "आढावा",
    departmentsAndOfficers: "विभाग आणि अधिकारी",
    allComplaints: "सर्व तक्रारी",
    totalComplaints: "एकूण तक्रारी",
    departments: "विभाग",
    officers: "अधिकारी",
    byStatus: "स्थितीनुसार",
    byDepartment: "विभागानुसार",
    complaint: "तक्रार",
    complaints: "तक्रारी",
    loadingOversightDashboard: "देखरेख डॅशबोर्ड लोड होत आहे…",

    addDepartment: "विभाग जोडा",
    name: "नाव",
    departmentNamePlaceholder: "उदा. रस्ते आणि पायाभूत सुविधा",
    category: "श्रेणी",
    contactEmail: "संपर्क ईमेल",

    provisionOfficerAccount: "अधिकारी खाते तयार करा",
    temporaryPassword: "तात्पुरता पासवर्ड",
    selectDepartment: "विभाग निवडा…",
    createOfficer: "अधिकारी तयार करा",

    departmentAdded: "विभाग जोडला गेला.",
    couldNotAddDepartment: "विभाग जोडता आला नाही.",
    pickDepartmentForOfficer: "या अधिकाऱ्यासाठी विभाग निवडा.",
    officerAccountCreated: "अधिकारी खाते तयार झाले.",
    couldNotCreateOfficer: "अधिकारी खाते तयार करता आले नाही.",

    noOfficerAccounts: "अद्याप कोणतीही अधिकारी खाती नाहीत — वरील फॉर्ममधून खाते तयार करा.",
    noComplaintsInSystem: "सिस्टममध्ये अद्याप कोणत्याही तक्रारी नाहीत.",
    raiseComplaintDescription:
      "तुम्ही निवडलेल्या श्रेणीनुसार तक्रार थेट योग्य विभागाकडे पाठवली जाईल.",

    issueInFewWords:
      "समस्या काही शब्दांत सांगा",

    issueTitlePlaceholder:
      "उदा. मुख्य रस्त्यावर मोठा खड्डा",

    department:
      "विभाग",

    location:
      "ठिकाण",

    locationPlaceholder:
      "उदा. शिवाजी चौकाजवळ, प्रभाग ५",

    describeIssue:
      "काय समस्या आहे ते सांगा",

    descriptionPlaceholder:
      "तुम्ही जितकी अधिक माहिती द्याल, तितक्या लवकर विभाग कारवाई करू शकतो.",

    photoOfIssue:
      "समस्येचा फोटो",

    submitting:
      "तक्रार पाठवत आहे…",

    submitComplaint:
      "तक्रार सादर करा",

    submitComplaintError:
      "तुमची तक्रार सादर करता आली नाही. कृपया पुन्हा प्रयत्न करा.",

    illegalConstruction:
      "बेकायदेशीर बांधकाम",

    other:
      "इतर",
    departmentQueue: "विभागीय तक्रार यादी",
    oversightDashboard: "देखरेख डॅशबोर्ड",
    citizenAccount: "नागरिक खाते",
    departmentOfficer: "विभागीय अधिकारी",
    commissioner: "आयुक्त",
    logout: "लॉग आउट",
    governmentPortal: "शासकीय पोर्टल",
    statusPending: "प्रलंबित",
    statusAssigned: "नियुक्त",
    statusInProgress: "प्रगतीपथावर",
    statusAwaitingConfirmation: "तुमच्या पुष्टीची प्रतीक्षा",
    statusCompleted: "पूर्ण",
    statusReopened: "पुन्हा उघडले",
    myComplaints: "माझ्या तक्रारी",

    complaintsWaitingConfirmation:
      "{{count}} तक्रार तुमच्या पुष्टीची वाट पाहत आहे.",

    complaintsTrackedDescription:
      "तुम्ही नोंदवलेल्या प्रत्येक तक्रारीचा नोंदणीपासून दुरुस्तीपर्यंत मागोवा घ्या.",

    raiseComplaint: "तक्रार नोंदवा",

    loadingComplaints:
      "तुमच्या तक्रारी लोड होत आहेत…",

    noComplaints:
      "तुम्ही अद्याप कोणतीही तक्रार नोंदवलेली नाही.",

    raiseFirstComplaint:
      "तुमची पहिली तक्रार नोंदवा",

    unassigned:
      "नियुक्त केलेले नाही",

    complaintNumber:
      "तक्रार",
    governmentPortal: "शासकीय पोर्टल",
    staffSignIn: "कर्मचारी लॉगिन",
    staffSignInDescription:
      "विभागीय अधिकारी आणि आयुक्तांच्या खात्यांसाठी.",
    officialEmail: "अधिकृत ईमेल",
    signingIn: "लॉगिन होत आहे…",
    signIn: "लॉगिन करा",
    governmentLoginOnly:
      "हे लॉगिन शासकीय कर्मचाऱ्यांसाठी आहे. त्याऐवजी नागरिक लॉगिन वापरा.",
    noGovernmentAccount:
      "खाते नाही? आपल्या आयुक्त कार्यालयाशी संपर्क साधा — कर्मचारी खाती स्वतः नोंदणी करून तयार करता येत नाहीत.",
    residentAccount: "नागरिक खाते",
    registerDescription: "नागरी समस्या नोंदवण्यासाठी नागरिक खाते तयार करा.",
    fullName: "पूर्ण नाव",
    phoneNumber: "फोन नंबर",
    creatingAccount: "खाते तयार होत आहे…",
    alreadyRegistered: "आधीच नोंदणी केली आहे?",
    registerError: "तुमचे खाते तयार करता आले नाही. पुन्हा प्रयत्न करा.",
    back: "मागे",
    residentLogin: "नागरिक लॉगिन",
    loginDescription: "तुमच्या तक्रारींचा मागोवा घ्या आणि नवीन तक्रारी नोंदवा.",
    email: "ईमेल",
    password: "पासवर्ड",
    loggingIn: "लॉगिन होत आहे…",
    newHere: "नवीन आहात?",
    createAccount: "खाते तयार करा",
    residentLoginOnly:
      "हे नागरिक लॉगिन आहे. कर्मचारी खात्यांसाठी शासकीय लॉगिन पृष्ठ वापरा.",
    loginError:
      "हा ईमेल आणि पासवर्ड आमच्या नोंदींशी जुळत नाही.",
    workForDepartment: "तुम्ही सरकारी विभागासाठी काम करता का?",
    governmentPortalDescription:
      "अधिकारी आणि आयुक्त समर्पित सरकारी पोर्टलद्वारे लॉगिन करतात — खाती तुमच्या कार्यालयाद्वारे तयार केली जातात, स्वतः नोंदणी करता येत नाही.",

    governmentLogin: "सरकारी लॉगिन",

    complaintsAutomaticallyRouted:
      "तुम्ही निवडलेल्या श्रेणीनुसार तक्रारी आपोआप योग्य विभागाकडे पाठवल्या जातात.",

    publicGrievancePortal: "सार्वजनिक तक्रार निवारण पोर्टल",

    footerDescription:
      "नागरिक आणि त्यांची सेवा करणाऱ्या विभागांसाठी तयार केलेले पोर्टल.",

    // Departments
    roads: "रस्ते",
    waterSupply: "पाणीपुरवठा",
    electricity: "वीज",
    sanitationGarbage: "स्वच्छता आणि कचरा",
    streetLighting: "पथदिवे",
    drainageSewage: "निचरा आणि सांडपाणी",
    publicHealth: "सार्वजनिक आरोग्य",
    parksEnvironment: "उद्याने आणि पर्यावरण",
      // Language
      language: "भाषा",
      english: "English",
      marathi: "मराठी",
      hindi: "हिन्दी",

      // Common
      welcome: "तक्रार पोर्टलमध्ये आपले स्वागत आहे",
      login: "लॉगिन",
      register: "नोंदणी",
      logout: "लॉगआउट",
      home: "मुख्यपृष्ठ",
      dashboard: "डॅशबोर्ड",
      complaints: "तक्रारी",
      raiseComplaint: "तक्रार नोंदवा",
      trackComplaint: "तक्रार ट्रॅक करा",

      username: "वापरकर्तानाव",
      password: "पासवर्ड",
      email: "ईमेल",
      phone: "फोन नंबर",

      submit: "सबमिट करा",
      cancel: "रद्द करा",
      save: "जतन करा",
      back: "मागे",

      loading: "लोड होत आहे...",
      success: "यशस्वी",
      error: "काहीतरी चूक झाली",

      // Landing Page
      heroTitle:
        "तक्रार नोंदवा. पाठपुरावा करा. निराकरणाची खात्री करा.",

      heroDescription:
        "नागरिक सेवा रहिवाशांना त्यांच्या स्थानिक सरकारी विभागांशी थेट जोडते — प्रत्येक तक्रार योग्य विभागाकडे पाठवली जाते, तिचा पाठपुरावा केला जातो आणि ती प्रत्यक्षात सोडवली गेल्याची खात्री झाल्यावरच बंद केली जाते.",

      reportIssue: "तक्रार नोंदवा",

      trackExistingComplaint:
        "विद्यमान तक्रारीचा पाठपुरावा करा",

      howItWorks: "हे कसे कार्य करते",

      reportTheIssue: "तक्रार नोंदवा",

      reportIssueDescription:
        "काय समस्या आहे ते सांगा, फोटो जोडा आणि तक्रार आपोआप योग्य विभागाकडे पाठवली जाईल.",

      trackItOpenly: "पारदर्शकपणे पाठपुरावा करा",

      trackItOpenlyDescription:
        "प्रलंबित, नियुक्त, प्रक्रियेत आणि निराकरण झालेल्या प्रत्येक स्थितीतील बदलाचा रिअल टाइममध्ये पाठपुरावा करा.",

      confirmItYourself: "स्वतः खात्री करा",

      confirmItYourselfDescription:
        "विभागाने तक्रार सोडवली असल्याचे सांगितल्यानंतर अंतिम खात्री तुम्ही स्वतः करू शकता — फोटो अपलोड करा आणि तक्रार बंद करा.",

      everyDepartmentOnePortal:
        "प्रत्येक विभाग, एकच पोर्टल"
    }
  },

  hi: {
    translation: {
    chatbotWelcome:
      "नमस्ते! मैं नागरिक सेवा सहायक हूँ। मैं आपको पोर्टल समझने, सही लॉगिन खोजने, पंजीकरण करने, शिकायत दर्ज करने या मौजूदा शिकायत को ट्रैक करने में मदद कर सकता हूँ।",

    needHelp: "मदद चाहिए?",

    chatbotName: "नागरिक सेवा सहायक",

    chatbotPlaceholder:
      "पोर्टल के बारे में कुछ भी पूछें…",

    send: "भेजें",

    typing: "टाइप कर रहा है…",

    takeMeThere: "मुझे वहां ले चलें",

    close: "बंद करें",

    chatbotConnectionError:
      "माफ़ कीजिए, मैं अभी सहायक से संपर्क नहीं कर सका। कृपया फिर से प्रयास करें।",
    commissionerOverview: "आयुक्त अवलोकन",
    commissionerOverviewDescription: "हर विभाग, हर अधिकारी, हर शिकायत — सब कुछ एक ही जगह।",
    overview: "अवलोकन",
    departmentsAndOfficers: "विभाग और अधिकारी",
    allComplaints: "सभी शिकायतें",
    totalComplaints: "कुल शिकायतें",
    departments: "विभाग",
    officers: "अधिकारी",
    byStatus: "स्थिति के अनुसार",
    byDepartment: "विभाग के अनुसार",
    complaint: "शिकायत",
    complaints: "शिकायतें",
    loadingOversightDashboard: "निगरानी डैशबोर्ड लोड हो रहा है…",

    addDepartment: "विभाग जोड़ें",
    name: "नाम",
    departmentNamePlaceholder: "उदा. सड़क और बुनियादी ढांचा",
    category: "श्रेणी",
    contactEmail: "संपर्क ईमेल",

    provisionOfficerAccount: "अधिकारी खाता बनाएं",
    temporaryPassword: "अस्थायी पासवर्ड",
    selectDepartment: "विभाग चुनें…",
    createOfficer: "अधिकारी बनाएं",

    departmentAdded: "विभाग जोड़ दिया गया।",
    couldNotAddDepartment: "विभाग नहीं जोड़ा जा सका।",
    pickDepartmentForOfficer: "इस अधिकारी के लिए विभाग चुनें।",
    officerAccountCreated: "अधिकारी खाता बना दिया गया।",
    couldNotCreateOfficer: "अधिकारी खाता नहीं बनाया जा सका।",

    noOfficerAccounts: "अभी तक कोई अधिकारी खाता नहीं है — ऊपर से एक खाता बनाएं।",
    noComplaintsInSystem: "सिस्टम में अभी तक कोई शिकायत नहीं है।",
    complaintNumber: "शिकायत",

    loadingComplaint: "शिकायत लोड हो रही है…",

    confirmationPhotoRequired: "पुष्टि करने से पहले मरम्मत किए गए स्थान की फोटो जोड़ें।",
    couldNotConfirmCompletion: "पूर्ण होने की पुष्टि नहीं की जा सकी।",

    reopenReasonPrompt: "अभी भी क्या समस्या है? इससे शिकायत वापस विभाग को भेजी जाएगी।",
    couldNotReopenComplaint: "यह शिकायत फिर से नहीं खोली जा सकी।",

    reported: "रिपोर्ट की गई",
    reportedConditionAlt: "रिपोर्ट करते समय की स्थिति",

    confirmedRepaired: "मरम्मत की पुष्टि",
    repairedConditionAlt: "मरम्मत के बाद की स्थिति",

    departmentNote: "विभाग की टिप्पणी:",

    departmentSaysFixed: "विभाग का कहना है कि समस्या ठीक हो गई है",
    confirmRepairDescription: "खुद पुष्टि करने के लिए मरम्मत किए गए स्थान की फोटो लें — शिकायत बंद करने का यही एकमात्र तरीका है।",

    optionalRemarks: "वैकल्पिक टिप्पणी",

    confirmFixed: "समस्या ठीक होने की पुष्टि करें",
    notFixedReopen: "ठीक नहीं हुआ — फिर से खोलें",

    timeline: "समयरेखा",
    changedBy: "द्वारा",
    raiseComplaintDescription:
      "आपके द्वारा चुनी गई श्रेणी के आधार पर शिकायत सीधे सही विभाग को भेजी जाएगी।",

    issueInFewWords:
      "समस्या कुछ शब्दों में बताएं",

    issueTitlePlaceholder:
      "उदा. मुख्य सड़क पर बड़ा गड्ढा",

    department:
      "विभाग",

    location:
      "स्थान",

    locationPlaceholder:
      "उदा. शिवाजी चौक के पास, वार्ड 5",

    describeIssue:
      "क्या समस्या हो रही है, बताएं",

    descriptionPlaceholder:
      "आप जितनी अधिक जानकारी देंगे, विभाग उतनी जल्दी कार्रवाई कर सकेगा।",

    photoOfIssue:
      "समस्या की फोटो",

    submitting:
      "जमा किया जा रहा है…",

    submitComplaint:
      "शिकायत जमा करें",

    submitComplaintError:
      "आपकी शिकायत जमा नहीं की जा सकी। कृपया फिर से प्रयास करें।",

    illegalConstruction:
      "अवैध निर्माण",

    other:
      "अन्य",
    departmentQueue: "विभागीय शिकायत सूची",
    oversightDashboard: "निगरानी डैशबोर्ड",
    citizenAccount: "नागरिक खाता",
    departmentOfficer: "विभागीय अधिकारी",
    commissioner: "आयुक्त",
    logout: "लॉग आउट",
    governmentPortal: "सरकारी पोर्टल",
    myComplaints: "मेरी शिकायतें",

    complaintsWaitingConfirmation:
      "{{count}} शिकायत आपकी पुष्टि की प्रतीक्षा कर रही है।",

    complaintsTrackedDescription:
      "आपके द्वारा दर्ज की गई हर शिकायत को रिपोर्ट से समाधान तक ट्रैक करें।",

    raiseComplaint:
      "शिकायत दर्ज करें",

    loadingComplaints:
      "आपकी शिकायतें लोड हो रही हैं…",

    noComplaints:
      "आपने अभी तक कोई शिकायत दर्ज नहीं की है।",

    raiseFirstComplaint:
      "अपनी पहली शिकायत दर्ज करें",

    unassigned:
      "असाइन नहीं किया गया",

    complaintNumber:
      "शिकायत",
      statusPending: "लंबित",
      statusAssigned: "असाइन किया गया",
      statusInProgress: "प्रगति पर",
      statusAwaitingConfirmation: "आपकी पुष्टि की प्रतीक्षा",
      statusCompleted: "पूर्ण",
      statusReopened: "फिर से खोला गया",
    governmentPortal: "सरकारी पोर्टल",
    staffSignIn: "कर्मचारी लॉगिन",
    staffSignInDescription:
      "विभागीय अधिकारियों और आयुक्त के खातों के लिए.",
    officialEmail: "आधिकारिक ईमेल",
    signingIn: "लॉगिन हो रहा है…",
    signIn: "लॉगिन करें",
    governmentLoginOnly:
      "यह लॉगिन सरकारी कर्मचारियों के लिए है। इसके बजाय नागरिक लॉगिन का उपयोग करें।",
    noGovernmentAccount:
      "खाता नहीं है? अपने आयुक्त कार्यालय से संपर्क करें — कर्मचारी खाते स्वयं पंजीकृत नहीं किए जा सकते।",
    residentAccount: "नागरिक खाता",
    registerDescription: "नागरिक समस्याओं की शिकायत दर्ज करने के लिए अपना खाता बनाएं.",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    creatingAccount: "खाता बनाया जा रहा है…",
    alreadyRegistered: "पहले से पंजीकृत हैं?",
    registerError: "आपका खाता नहीं बनाया जा सका। कृपया फिर से प्रयास करें.",
    back: "वापस",
    residentLogin: "नागरिक लॉगिन",
    loginDescription: "अपनी शिकायतों को ट्रैक करें और नई शिकायतें दर्ज करें.",
    email: "ईमेल",
    password: "पासवर्ड",
    loggingIn: "लॉगिन हो रहा है…",
    newHere: "नए हैं?",
    createAccount: "खाता बनाएं",
    residentLoginOnly:
      "यह नागरिक लॉगिन है। कर्मचारियों के लिए सरकारी लॉगिन पेज का उपयोग करें।",
    loginError:
      "यह ईमेल और पासवर्ड हमारे रिकॉर्ड से मेल नहीं खाते।",
    workForDepartment: "क्या आप किसी सरकारी विभाग के लिए काम करते हैं?",
    governmentPortalDescription:
      "अधिकारी और आयुक्त एक समर्पित सरकारी पोर्टल के माध्यम से लॉगिन करते हैं — खाते आपके कार्यालय द्वारा बनाए जाते हैं, स्वयं पंजीकरण नहीं किया जा सकता।",

    governmentLogin: "सरकारी लॉगिन",

    complaintsAutomaticallyRouted:
      "आपके द्वारा चुनी गई श्रेणी के आधार पर शिकायतें अपने आप सही विभाग को भेजी जाती हैं।",

    publicGrievancePortal: "सार्वजनिक शिकायत निवारण पोर्टल",

    footerDescription:
      "निवासियों और उनकी सेवा करने वाले विभागों के लिए बनाया गया पोर्टल।",

    // Departments
    roads: "सड़कें",
    waterSupply: "जल आपूर्ति",
    electricity: "बिजली",
    sanitationGarbage: "स्वच्छता और कचरा",
    streetLighting: "स्ट्रीट लाइटिंग",
    drainageSewage: "जल निकासी और सीवेज",
    publicHealth: "सार्वजनिक स्वास्थ्य",
    parksEnvironment: "पार्क और पर्यावरण",
      // Language
      language: "भाषा",
      english: "English",
      marathi: "मराठी",
      hindi: "हिन्दी",

      // Common
      welcome: "शिकायत पोर्टल में आपका स्वागत है",
      login: "लॉगिन",
      register: "पंजीकरण",
      logout: "लॉगआउट",
      home: "होम",
      dashboard: "डैशबोर्ड",
      complaints: "शिकायतें",
      raiseComplaint: "शिकायत दर्ज करें",
      trackComplaint: "शिकायत ट्रैक करें",

      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      email: "ईमेल",
      phone: "फोन नंबर",

      submit: "सबमिट करें",
      cancel: "रद्द करें",
      save: "सहेजें",
      back: "वापस",

      loading: "लोड हो रहा है...",
      success: "सफल",
      error: "कुछ गलत हो गया",

      // Landing Page
      heroTitle:
        "शिकायत दर्ज करें। ट्रैक करें। समाधान की पुष्टि करें।",

      heroDescription:
        "नागरिक सेवा निवासियों को उनके स्थानीय सरकारी विभागों से सीधे जोड़ती है — हर शिकायत सही विभाग को भेजी जाती है, ट्रैक की जाती है और तभी बंद की जाती है जब आप पुष्टि करें कि उसका समाधान हो गया है।",

      reportIssue: "शिकायत दर्ज करें",

      trackExistingComplaint:
        "मौजूदा शिकायत ट्रैक करें",

      howItWorks: "यह कैसे काम करता है",

      reportTheIssue: "शिकायत दर्ज करें",

      reportIssueDescription:
        "समस्या का विवरण दें, फोटो जोड़ें और शिकायत अपने आप सही विभाग को भेज दी जाएगी।",

      trackItOpenly: "पारदर्शी तरीके से ट्रैक करें",

      trackItOpenlyDescription:
        "लंबित, नियुक्त, प्रक्रिया में और समाधान जैसी प्रत्येक स्थिति में होने वाले बदलाव को रियल टाइम में ट्रैक करें।",

      confirmItYourself: "स्वयं पुष्टि करें",

      confirmItYourselfDescription:
        "जब विभाग कहे कि समस्या का समाधान हो गया है, तो अंतिम पुष्टि आप स्वयं कर सकते हैं — फोटो अपलोड करें और शिकायत बंद करें।",

      everyDepartmentOnePortal:
        "हर विभाग, एक पोर्टल"
    }
  }
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;