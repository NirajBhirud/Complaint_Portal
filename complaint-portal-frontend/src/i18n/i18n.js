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

    footerForCitizens: "For citizens",
    footerForGovernment: "For government",

    // Departments
    roads: "Roads",
    waterSupply: "Water Supply",
    electricity: "Electricity",
    sanitationGarbage: "Sanitation & Garbage",
    streetLighting: "Street Lighting",
    drainageSewage: "Drainage & Sewage",
    publicHealth: "Public Health",
    parksEnvironment: "Parks & Environment",

    deptRoadsDesc: "Potholes, damaged roads, and encroachments on carriageways.",
    deptWaterSupplyDesc: "Leakages, low pressure, and contamination in the water supply.",
    deptElectricityDesc: "Power outages, damaged poles, and exposed wiring.",
    deptSanitationDesc: "Missed collections, overflowing bins, and public cleanliness.",
    deptStreetLightingDesc: "Broken or dark streetlights along roads and public spaces.",
    deptDrainageDesc: "Blocked drains, sewage overflow, and waterlogging.",
    deptPublicHealthDesc: "Unhygienic conditions, stray animal concerns, and pest issues.",
    deptParksDesc: "Park upkeep, tree damage, and local pollution.",
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

      everyDepartmentOnePortal: "Every department, one portal",

      platformFeaturesTitle: "Built for real accountability",
      platformFeaturesSub:
        "Every complaint is tracked, verified, and only closed when you say so.",

      featureAiTitle: "Help whenever you need it",
      featureAiDescription:
        "An assistant answers questions about the portal any time — finding the right login, explaining the process, or guiding you to raise a complaint.",

      featurePhotoTitle: "Evidence on both sides",
      featurePhotoDescription:
        "Every complaint is backed by a photo when it's raised, and the department must show a photo of the completed work too.",

      featureVerifiedTitle: "You have the final word",
      featureVerifiedDescription:
        "A complaint is only marked resolved when you confirm it yourself — the department alone can't close it.",

      featureOversightTitle: "Overseen from the top",
      featureOversightDescription:
        "A commissioner monitors every department's progress, so nothing quietly stalls in a queue.",

      trustRouted: "Routed to the right department automatically",
      trustClosedByYou: "Closed only when you confirm it",
      trustMultilingual: "Works in English, Hindi and Marathi",
      locationHelp:
        "You can enter a landmark or address. For a more accurate location, use your device's GPS.",

      exactLocation:
        "Exact GPS location",

      exactLocationDescription:
        "Share your current location so the department can find the issue precisely.",

      useMyLocation:
        "Use my current location",

      detectingLocation:
        "Detecting location…",

      locationCaptured:
        "Location captured successfully.",

      locationUnavailable:
        "Unable to access your location. Please allow location permission and try again.",

      locationAccuracy:
        "Accuracy",

      latitude:
        "Latitude",

      longitude:
        "Longitude",

      clearLocation:
        "Clear location",

      previewLocationOnMap:
        "Preview location on map",

      locationInformation:
        "Location information",

      address:
        "Address",

      viewOnMap:
        "View on map",

      openExactLocation:
        "Open exact location",

      noGpsLocation:
        "GPS location was not provided for this complaint.",

      departmentQueueDescription:
        "Complaints routed to your department, with exact citizen locations when available.",

      loadingQueue:
        "Loading department queue…",

      noComplaintsInDepartment:
        "No complaints in your department right now.",

      officerRemarkPlaceholder:
        "Add a remark for this update…",

      assignToSelf:
        "Assign to self",

      markInProgress:
        "Mark in progress",

      markResolved:
        "Mark resolved",

      citizenMustConfirm:
        "Only the citizen can mark this complaint as completed after confirming the repair.",

      updateFailed:
        "Update failed."
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

    footerForCitizens: "नागरिकांसाठी",
    footerForGovernment: "सरकारसाठी",

    // Departments
    roads: "रस्ते",
    waterSupply: "पाणीपुरवठा",
    electricity: "वीज",
    sanitationGarbage: "स्वच्छता आणि कचरा",
    streetLighting: "पथदिवे",
    drainageSewage: "निचरा आणि सांडपाणी",
    publicHealth: "सार्वजनिक आरोग्य",
    parksEnvironment: "उद्याने आणि पर्यावरण",

    deptRoadsDesc: "खड्डे, खराब रस्ते आणि रस्त्यावरील अतिक्रमणे.",
    deptWaterSupplyDesc: "गळती, कमी दाब आणि पाणीपुरवठ्यातील दूषितता.",
    deptElectricityDesc: "वीजपुरवठा खंडित होणे, खराब खांब आणि उघडे वायर.",
    deptSanitationDesc: "कचरा न उचलणे, कचराकुंड्या भरून वाहणे आणि सार्वजनिक स्वच्छता.",
    deptStreetLightingDesc: "रस्त्यांवरील आणि सार्वजनिक ठिकाणी बंद किंवा तुटलेले पथदिवे.",
    deptDrainageDesc: "बंद गटारे, सांडपाणी वाहणे आणि पाणी साचणे.",
    deptPublicHealthDesc: "अस्वच्छ परिस्थिती, भटक्या प्राण्यांच्या समस्या आणि किडींचा त्रास.",
    deptParksDesc: "उद्यानांची देखभाल, झाडांचे नुकसान आणि स्थानिक प्रदूषण.",
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
        "प्रत्येक विभाग, एकच पोर्टल",

      platformFeaturesTitle: "खऱ्या जबाबदारीसाठी तयार केलेले",
      platformFeaturesSub:
        "प्रत्येक तक्रारीचा पाठपुरावा आणि पडताळणी केली जाते, आणि तुम्ही सांगाल तेव्हाच ती बंद केली जाते.",

      featureAiTitle: "जेव्हा गरज असेल तेव्हा मदत",
      featureAiDescription:
        "सहाय्यक पोर्टलबद्दलच्या प्रश्नांची उत्तरे कधीही देतो — योग्य लॉगिन शोधणे, प्रक्रिया समजावणे किंवा तक्रार नोंदवण्यास मार्गदर्शन करणे.",

      featurePhotoTitle: "दोन्ही बाजूंनी पुरावा",
      featurePhotoDescription:
        "तक्रार नोंदवताना फोटो आवश्यक असतो, आणि काम पूर्ण झाल्यावर विभागालाही फोटो दाखवावा लागतो.",

      featureVerifiedTitle: "अंतिम निर्णय तुमचा",
      featureVerifiedDescription:
        "तक्रार तेव्हाच निकाली निघाल्याचे मानले जाते जेव्हा तुम्ही स्वतः त्याची खात्री करता — विभाग एकट्याने ती बंद करू शकत नाही.",

      featureOversightTitle: "वरून देखरेख",
      featureOversightDescription:
        "आयुक्त प्रत्येक विभागाच्या प्रगतीवर लक्ष ठेवतात, त्यामुळे कोणतीही तक्रार शांतपणे रेंगाळत राहत नाही.",

      trustRouted: "आपोआप योग्य विभागाकडे पाठवली जाते",
      trustClosedByYou: "तुम्ही खात्री केल्यावरच बंद होते",
      trustMultilingual: "इंग्रजी, हिंदी आणि मराठीत उपलब्ध",
      locationHelp:
        "आपण पत्ता किंवा जवळची खूण लिहू शकता. अधिक अचूक स्थानासाठी आपल्या डिव्हाइसचे GPS वापरा.",

      exactLocation:
        "अचूक GPS स्थान",

      exactLocationDescription:
        "विभागाला समस्या नेमक्या ठिकाणी शोधता यावी यासाठी आपले सध्याचे स्थान शेअर करा.",

      useMyLocation:
        "माझे सध्याचे स्थान वापरा",

      detectingLocation:
        "स्थान शोधत आहे…",

      locationCaptured:
        "स्थान यशस्वीरित्या मिळाले.",

      locationUnavailable:
        "आपले स्थान मिळवता आले नाही. कृपया स्थानाची परवानगी द्या आणि पुन्हा प्रयत्न करा.",

      locationAccuracy:
        "अचूकता",

      latitude:
        "अक्षांश",

      longitude:
        "रेखांश",

      clearLocation:
        "स्थान काढा",

      previewLocationOnMap:
        "नकाशावर स्थान पहा",

      locationInformation:
        "स्थानाची माहिती",

      address:
        "पत्ता",

      viewOnMap:
        "नकाशावर पहा",

      openExactLocation:
        "अचूक स्थान उघडा",

      noGpsLocation:
        "या तक्रारीसाठी GPS स्थान दिलेले नाही.",

      departmentQueueDescription:
        "आपल्या विभागाकडे पाठवलेल्या तक्रारी आणि उपलब्ध असल्यास नागरिकांनी दिलेले अचूक स्थान पहा.",

      loadingQueue:
        "विभागीय तक्रारी लोड होत आहेत…",

      noComplaintsInDepartment:
        "सध्या आपल्या विभागात कोणत्याही तक्रारी नाहीत.",

      officerRemarkPlaceholder:
        "या अपडेटसाठी टिप्पणी लिहा…",

      assignToSelf:
        "स्वतःला नियुक्त करा",

      markInProgress:
        "प्रगतीमध्ये चिन्हांकित करा",

      markResolved:
        "निराकरण झाले असे चिन्हांकित करा",

      citizenMustConfirm:
        "दुरुस्तीची पुष्टी केल्यानंतर फक्त नागरिकच तक्रार पूर्ण झाल्याचे चिन्हांकित करू शकतो.",

      updateFailed:
        "अपडेट अयशस्वी झाले."
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

    footerForCitizens: "नागरिकों के लिए",
    footerForGovernment: "सरकार के लिए",

    // Departments
    roads: "सड़कें",
    waterSupply: "जल आपूर्ति",
    electricity: "बिजली",
    sanitationGarbage: "स्वच्छता और कचरा",
    streetLighting: "स्ट्रीट लाइटिंग",
    drainageSewage: "जल निकासी और सीवेज",
    publicHealth: "सार्वजनिक स्वास्थ्य",
    parksEnvironment: "पार्क और पर्यावरण",

    deptRoadsDesc: "गड्ढे, क्षतिग्रस्त सड़कें, और सड़कों पर अतिक्रमण।",
    deptWaterSupplyDesc: "रिसाव, कम दबाव, और जलापूर्ति में मिलावट।",
    deptElectricityDesc: "बिजली कटौती, क्षतिग्रस्त खंभे, और खुले तार।",
    deptSanitationDesc: "कचरा न उठना, भरे हुए कूड़ेदान, और सार्वजनिक स्वच्छता।",
    deptStreetLightingDesc: "सड़कों और सार्वजनिक स्थानों पर खराब या बंद स्ट्रीट लाइटें।",
    deptDrainageDesc: "बंद नालियाँ, सीवेज ओवरफ्लो, और जलभराव।",
    deptPublicHealthDesc: "अस्वच्छ स्थितियाँ, आवारा पशुओं की समस्या, और कीट-प्रकोप।",
    deptParksDesc: "पार्कों का रखरखाव, पेड़ों को नुकसान, और स्थानीय प्रदूषण।",
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
        "हर विभाग, एक पोर्टल",

      platformFeaturesTitle: "वास्तविक जवाबदेही के लिए बनाया गया",
      platformFeaturesSub:
        "हर शिकायत को ट्रैक और सत्यापित किया जाता है, और वह तभी बंद होती है जब आप कहें।",

      featureAiTitle: "जब भी ज़रूरत हो, मदद मौजूद",
      featureAiDescription:
        "एक सहायक पोर्टल से जुड़े सवालों के जवाब कभी भी देता है — सही लॉगिन ढूँढना, प्रक्रिया समझाना, या शिकायत दर्ज करने में मार्गदर्शन करना।",

      featurePhotoTitle: "दोनों तरफ से सबूत",
      featurePhotoDescription:
        "शिकायत दर्ज करते समय फोटो ज़रूरी है, और काम पूरा होने पर विभाग को भी फोटो दिखानी होती है।",

      featureVerifiedTitle: "अंतिम फैसला आपका",
      featureVerifiedDescription:
        "शिकायत तभी हल मानी जाती है जब आप स्वयं इसकी पुष्टि करें — अकेले विभाग इसे बंद नहीं कर सकता।",

      featureOversightTitle: "ऊपर से निगरानी",
      featureOversightDescription:
        "एक आयुक्त हर विभाग की प्रगति पर नज़र रखता है, ताकि कोई शिकायत चुपचाप अटकी न रहे।",

      trustRouted: "अपने आप सही विभाग को भेजी जाती है",
      trustClosedByYou: "आपकी पुष्टि के बाद ही बंद होती है",
      trustMultilingual: "अंग्रेज़ी, हिंदी और मराठी में उपलब्ध",
      locationHelp:
        "आप पता या नज़दीकी स्थान लिख सकते हैं। अधिक सटीक स्थान के लिए अपने डिवाइस का GPS इस्तेमाल करें।",

      exactLocation:
        "सटीक GPS स्थान",

      exactLocationDescription:
        "विभाग को समस्या का सटीक स्थान खोजने में मदद करने के लिए अपना वर्तमान स्थान साझा करें।",

      useMyLocation:
        "मेरा वर्तमान स्थान इस्तेमाल करें",

      detectingLocation:
        "स्थान खोजा जा रहा है…",

      locationCaptured:
        "स्थान सफलतापूर्वक प्राप्त हुआ।",

      locationUnavailable:
        "आपका स्थान प्राप्त नहीं किया जा सका। कृपया स्थान की अनुमति दें और फिर प्रयास करें।",

      locationAccuracy:
        "सटीकता",

      latitude:
        "अक्षांश",

      longitude:
        "देशांतर",

      clearLocation:
        "स्थान हटाएं",

      previewLocationOnMap:
        "मानचित्र पर स्थान देखें",

      locationInformation:
        "स्थान की जानकारी",

      address:
        "पता",

      viewOnMap:
        "मानचित्र पर देखें",

      openExactLocation:
        "सटीक स्थान खोलें",

      noGpsLocation:
        "इस शिकायत के लिए GPS स्थान उपलब्ध नहीं कराया गया है।",

      departmentQueueDescription:
        "आपके विभाग को भेजी गई शिकायतें और उपलब्ध होने पर नागरिक द्वारा दिया गया सटीक स्थान देखें।",

      loadingQueue:
        "विभागीय शिकायतें लोड हो रही हैं…",

      noComplaintsInDepartment:
        "अभी आपके विभाग में कोई शिकायत नहीं है।",

      officerRemarkPlaceholder:
        "इस अपडेट के लिए टिप्पणी लिखें…",

      assignToSelf:
        "स्वयं को असाइन करें",

      markInProgress:
        "प्रगति में चिह्नित करें",

      markResolved:
        "समाधान किया गया चिह्नित करें",

      citizenMustConfirm:
        "मरम्मत की पुष्टि करने के बाद केवल नागरिक ही शिकायत को पूर्ण कर सकता है।",

      updateFailed:
        "अपडेट विफल हुआ।"
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