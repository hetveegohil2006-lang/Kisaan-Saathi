(() => {
    const keys = [
        "Overview", "Chat", "Soil", "Weather", "Videos", "Market", "Schemes", "Profile",
        "Login", "Sign Up", "Email", "Mobile number", "Email Address", "Mobile Number",
        "Full Name", "Password", "Create Password", "State / Region", "Send email code",
        "Send SMS code", "Verify & Register", "Login to Portal", "Apply Now", "Submit",
        "Save Changes", "Cancel", "Delete", "Hear guide", "View Details", "Edit Profile",
        "Start Tour", "Skip Tour", "Retry Connection", "Back to Dashboard"
    ];
    const words = {
        en: keys,
        hi: ["अवलोकन", "चैट", "मिट्टी", "मौसम", "वीडियो", "बाज़ार", "योजनाएँ", "प्रोफ़ाइल", "लॉग इन", "साइन अप", "ईमेल", "मोबाइल नंबर", "ईमेल पता", "मोबाइल नंबर", "पूरा नाम", "पासवर्ड", "पासवर्ड बनाएँ", "राज्य / क्षेत्र", "ईमेल कोड भेजें", "SMS कोड भेजें", "सत्यापित करें और पंजीकरण करें", "पोर्टल में लॉग इन करें", "अभी आवेदन करें", "जमा करें", "बदलाव सहेजें", "रद्द करें", "हटाएँ", "गाइड सुनें", "विवरण देखें", "प्रोफ़ाइल संपादित करें", "टूर शुरू करें", "टूर छोड़ें", "पुनः प्रयास करें", "डैशबोर्ड पर वापस जाएँ"],
        mr: ["आढावा", "चॅट", "माती", "हवामान", "व्हिडिओ", "बाजार", "योजना", "प्रोफाइल", "लॉग इन", "नोंदणी", "ईमेल", "मोबाइल क्रमांक", "ईमेल पत्ता", "मोबाइल क्रमांक", "पूर्ण नाव", "पासवर्ड", "पासवर्ड तयार करा", "राज्य / प्रदेश", "ईमेल कोड पाठवा", "SMS कोड पाठवा", "पडताळा आणि नोंदणी करा", "पोर्टलमध्ये लॉग इन करा", "आता अर्ज करा", "सबमिट करा", "बदल जतन करा", "रद्द करा", "हटवा", "मार्गदर्शक ऐका", "तपशील पहा", "प्रोफाइल संपादित करा", "टूर सुरू करा", "टूर वगळा", "पुन्हा प्रयत्न करा", "डॅशबोर्डवर परत जा"],
        pa: ["ਜਾਣਕਾਰੀ", "ਚੈਟ", "ਮਿੱਟੀ", "ਮੌਸਮ", "ਵੀਡੀਓ", "ਮੰਡੀ", "ਯੋਜਨਾਵਾਂ", "ਪ੍ਰੋਫ਼ਾਈਲ", "ਲਾਗ ਇਨ", "ਸਾਈਨ ਅੱਪ", "ਈਮੇਲ", "ਮੋਬਾਈਲ ਨੰਬਰ", "ਈਮੇਲ ਪਤਾ", "ਮੋਬਾਈਲ ਨੰਬਰ", "ਪੂਰਾ ਨਾਮ", "ਪਾਸਵਰਡ", "ਪਾਸਵਰਡ ਬਣਾਓ", "ਰਾਜ / ਖੇਤਰ", "ਈਮੇਲ ਕੋਡ ਭੇਜੋ", "SMS ਕੋਡ ਭੇਜੋ", "ਪੜਤਾਲ ਕਰੋ ਅਤੇ ਰਜਿਸਟਰ ਕਰੋ", "ਪੋਰਟਲ ਵਿੱਚ ਲਾਗ ਇਨ ਕਰੋ", "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ", "ਜਮ੍ਹਾਂ ਕਰੋ", "ਬਦਲਾਅ ਸੰਭਾਲੋ", "ਰੱਦ ਕਰੋ", "ਮਿਟਾਓ", "ਗਾਈਡ ਸੁਣੋ", "ਵੇਰਵੇ ਵੇਖੋ", "ਪ੍ਰੋਫ਼ਾਈਲ ਸੋਧੋ", "ਟੂਰ ਸ਼ੁਰੂ ਕਰੋ", "ਟੂਰ ਛੱਡੋ", "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ", "ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ"],
        gu: ["ઝાંખી", "ચેટ", "માટી", "હવામાન", "વિડિયો", "બજાર", "યોજનાઓ", "પ્રોફાઇલ", "લૉગ ઇન", "સાઇન અપ", "ઇમેઇલ", "મોબાઇલ નંબર", "ઇમેઇલ સરનામું", "મોબાઇલ નંબર", "પૂરું નામ", "પાસવર્ડ", "પાસવર્ડ બનાવો", "રાજ્ય / પ્રદેશ", "ઇમેઇલ કોડ મોકલો", "SMS કોડ મોકલો", "ચકાસો અને નોંધણી કરો", "પોર્ટલમાં લૉગ ઇન કરો", "હમણાં અરજી કરો", "સબમિટ કરો", "ફેરફારો સાચવો", "રદ કરો", "કાઢી નાખો", "માર્ગદર્શિકા સાંભળો", "વિગતો જુઓ", "પ્રોફાઇલ સંપાદિત કરો", "ટૂર શરૂ કરો", "ટૂર છોડો", "ફરી પ્રયાસ કરો", "ડેશબોર્ડ પર પાછા જાઓ"],
        bn: ["সংক্ষিপ্ত বিবরণ", "চ্যাট", "মাটি", "আবহাওয়া", "ভিডিও", "বাজার", "প্রকল্প", "প্রোফাইল", "লগ ইন", "সাইন আপ", "ইমেল", "মোবাইল নম্বর", "ইমেল ঠিকানা", "মোবাইল নম্বর", "পুরো নাম", "পাসওয়ার্ড", "পাসওয়ার্ড তৈরি করুন", "রাজ্য / অঞ্চল", "ইমেল কোড পাঠান", "SMS কোড পাঠান", "যাচাই করে নিবন্ধন করুন", "পোর্টালে লগ ইন করুন", "এখনই আবেদন করুন", "জমা দিন", "পরিবর্তন সংরক্ষণ করুন", "বাতিল", "মুছুন", "গাইড শুনুন", "বিস্তারিত দেখুন", "প্রোফাইল সম্পাদনা করুন", "ট্যুর শুরু করুন", "ট্যুর এড়িয়ে যান", "আবার চেষ্টা করুন", "ড্যাশবোর্ডে ফিরে যান"],
        te: ["అవలోకనం", "చాట్", "నేల", "వాతావరణం", "వీడియోలు", "మార్కెట్", "పథకాలు", "ప్రొఫైల్", "లాగిన్", "సైన్ అప్", "ఇమెయిల్", "మొబైల్ నంబర్", "ఇమెయిల్ చిరునామా", "మొబైల్ నంబర్", "పూర్తి పేరు", "పాస్‌వర్డ్", "పాస్‌వర్డ్ సృష్టించండి", "రాష్ట్రం / ప్రాంతం", "ఇమెయిల్ కోడ్ పంపండి", "SMS కోడ్ పంపండి", "ధృవీకరించి నమోదు చేయండి", "పోర్టల్‌లోకి లాగిన్ అవ్వండి", "ఇప్పుడే దరఖాస్తు చేయండి", "సమర్పించండి", "మార్పులను సేవ్ చేయండి", "రద్దు చేయండి", "తొలగించండి", "గైడ్ వినండి", "వివరాలు చూడండి", "ప్రొఫైల్ సవరించండి", "టూర్ ప్రారంభించండి", "టూర్ దాటవేయండి", "మళ్లీ ప్రయత్నించండి", "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి"],
        ta: ["கண்ணோட்டம்", "அரட்டை", "மண்", "வானிலை", "வீடியோக்கள்", "சந்தை", "திட்டங்கள்", "சுயவிவரம்", "உள்நுழை", "பதிவு செய்", "மின்னஞ்சல்", "மொபைல் எண்", "மின்னஞ்சல் முகவரி", "மொபைல் எண்", "முழுப் பெயர்", "கடவுச்சொல்", "கடவுச்சொல்லை உருவாக்கு", "மாநிலம் / பகுதி", "மின்னஞ்சல் குறியீட்டை அனுப்பு", "SMS குறியீட்டை அனுப்பு", "சரிபார்த்து பதிவு செய்", "போர்ட்டலில் உள்நுழை", "இப்போது விண்ணப்பி", "சமர்ப்பி", "மாற்றங்களைச் சேமி", "ரத்துசெய்", "நீக்கு", "வழிகாட்டியைக் கேள்", "விவரங்களைக் காண்க", "சுயவிவரத்தைத் திருத்து", "சுற்றுப்பயணத்தைத் தொடங்கு", "சுற்றுப்பயணத்தைத் தவிர்", "மீண்டும் முயற்சி", "டாஷ்போர்டுக்குத் திரும்பு"],
        kn: ["ಅವಲೋಕನ", "ಚಾಟ್", "ಮಣ್ಣು", "ಹವಾಮಾನ", "ವೀಡಿಯೊಗಳು", "ಮಾರುಕಟ್ಟೆ", "ಯೋಜನೆಗಳು", "ಪ್ರೊಫೈಲ್", "ಲಾಗಿನ್", "ಸೈನ್ ಅಪ್", "ಇಮೇಲ್", "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", "ಇಮೇಲ್ ವಿಳಾಸ", "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", "ಪೂರ್ಣ ಹೆಸರು", "ಪಾಸ್‌ವರ್ಡ್", "ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ", "ರಾಜ್ಯ / ಪ್ರದೇಶ", "ಇಮೇಲ್ ಕೋಡ್ ಕಳುಹಿಸಿ", "SMS ಕೋಡ್ ಕಳುಹಿಸಿ", "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನೋಂದಣಿ ಮಾಡಿ", "ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ", "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", "ಸಲ್ಲಿಸಿ", "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ", "ರದ್ದುಮಾಡಿ", "ಅಳಿಸಿ", "ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ", "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ", "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ", "ಪ್ರವಾಸ ಪ್ರಾರಂಭಿಸಿ", "ಪ್ರವಾಸ ಬಿಟ್ಟುಬಿಡಿ", "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ"],
        ml: ["അവലോകനം", "ചാറ്റ്", "മണ്ണ്", "കാലാവസ്ഥ", "വീഡിയോകൾ", "വിപണി", "പദ്ധതികൾ", "പ്രൊഫൈൽ", "ലോഗിൻ", "സൈൻ അപ്പ്", "ഇമെയിൽ", "മൊബൈൽ നമ്പർ", "ഇമെയിൽ വിലാസം", "മൊബൈൽ നമ്പർ", "മുഴുവൻ പേര്", "പാസ്‌വേഡ്", "പാസ്‌വേഡ് സൃഷ്ടിക്കുക", "സംസ്ഥാനം / പ്രദേശം", "ഇമെയിൽ കോഡ് അയയ്ക്കുക", "SMS കോഡ് അയയ്ക്കുക", "പരിശോധിച്ച് രജിസ്റ്റർ ചെയ്യുക", "പോർട്ടലിൽ ലോഗിൻ ചെയ്യുക", "ഇപ്പോൾ അപേക്ഷിക്കുക", "സമർപ്പിക്കുക", "മാറ്റങ്ങൾ സംരക്ഷിക്കുക", "റദ്ദാക്കുക", "ഇല്ലാതാക്കുക", "ഗൈഡ് കേൾക്കുക", "വിശദാംശങ്ങൾ കാണുക", "പ്രൊഫൈൽ തിരുത്തുക", "ടൂർ ആരംഭിക്കുക", "ടൂർ ഒഴിവാക്കുക", "വീണ്ടും ശ്രമിക്കുക", "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക"],
        or: ["ସମୀକ୍ଷା", "ଚାଟ୍", "ମାଟି", "ପାଣିପାଗ", "ଭିଡିଓ", "ବଜାର", "ଯୋଜନା", "ପ୍ରୋଫାଇଲ୍", "ଲଗ୍ ଇନ୍", "ସାଇନ୍ ଅପ୍", "ଇମେଲ୍", "ମୋବାଇଲ୍ ନମ୍ବର", "ଇମେଲ୍ ଠିକଣା", "ମୋବାଇଲ୍ ନମ୍ବର", "ପୂରା ନାମ", "ପାସୱାର୍ଡ", "ପାସୱାର୍ଡ ତିଆରି କରନ୍ତୁ", "ରାଜ୍ୟ / ଅଞ୍ଚଳ", "ଇମେଲ୍ କୋଡ୍ ପଠାନ୍ତୁ", "SMS କୋଡ୍ ପଠାନ୍ତୁ", "ଯାଞ୍ଚ କରି ପଞ୍ଜୀକରଣ କରନ୍ତୁ", "ପୋର୍ଟାଲରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ", "ଏବେ ଆବେଦନ କରନ୍ତୁ", "ଦାଖଲ କରନ୍ତୁ", "ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ", "ବାତିଲ୍", "ବିଲୋପ କରନ୍ତୁ", "ଗାଇଡ୍ ଶୁଣନ୍ତୁ", "ବିବରଣୀ ଦେଖନ୍ତୁ", "ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନା କରନ୍ତୁ", "ଟୁର୍ ଆରମ୍ଭ କରନ୍ତୁ", "ଟୁର୍ ଛାଡ଼ନ୍ତୁ", "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ", "ଡ୍ୟାସବୋର୍ଡକୁ ଫେରନ୍ତୁ"],
        as: ["অৱলোকন", "চেট", "মাটি", "বতৰ", "ভিডিঅ’", "বজাৰ", "আঁচনি", "প্ৰ’ফাইল", "লগ ইন", "ছাইন আপ", "ইমেইল", "ম’বাইল নম্বৰ", "ইমেইল ঠিকনা", "ম’বাইল নম্বৰ", "সম্পূৰ্ণ নাম", "পাছৱৰ্ড", "পাছৱৰ্ড সৃষ্টি কৰক", "ৰাজ্য / অঞ্চল", "ইমেইল কোড পঠিয়াওক", "SMS কোড পঠিয়াওক", "পৰীক্ষা কৰি পঞ্জীয়ন কৰক", "প’ৰ্টেলত লগ ইন কৰক", "এতিয়াই আবেদন কৰক", "দাখিল কৰক", "সলনি সংৰক্ষণ কৰক", "বাতিল কৰক", "মচি পেলাওক", "গাইড শুনক", "বিৱৰণ চাওক", "প্ৰ’ফাইল সম্পাদনা কৰক", "ট্যুৰ আৰম্ভ কৰক", "ট্যুৰ বাদ দিয়ক", "পুনৰ চেষ্টা কৰক", "ডেশ্বব’ৰ্ডলৈ উভতি যাওক"],
        ur: ["جائزہ", "چیٹ", "مٹی", "موسم", "ویڈیوز", "منڈی", "اسکیمیں", "پروفائل", "لاگ ان", "سائن اپ", "ای میل", "موبائل نمبر", "ای میل پتہ", "موبائل نمبر", "پورا نام", "پاس ورڈ", "پاس ورڈ بنائیں", "ریاست / علاقہ", "ای میل کوڈ بھیجیں", "SMS کوڈ بھیجیں", "تصدیق کرکے رجسٹر کریں", "پورٹل میں لاگ ان کریں", "ابھی درخواست دیں", "جمع کریں", "تبدیلیاں محفوظ کریں", "منسوخ کریں", "حذف کریں", "گائیڈ سنیں", "تفصیلات دیکھیں", "پروفائل میں ترمیم کریں", "ٹور شروع کریں", "ٹور چھوڑیں", "دوبارہ کوشش کریں", "ڈیش بورڈ پر واپس جائیں"]
    };

    const dictionaries = Object.fromEntries(Object.entries(words).map(([lang, values]) => [
        lang,
        Object.fromEntries(keys.map((key, index) => [key, values[index]]))
    ]));
    const labelAliases = {
        "AI Chatbot": "Chat",
        "Soil and Crop": "Soil",
        "Weather and Alerts": "Weather",
        "Tutorials": "Videos",
        "Market and Expenses": "Market",
        "Government Schemes": "Schemes",
        "Profile Settings": "Profile"
    };
    Object.values(dictionaries).forEach((dictionary) => {
        Object.entries(labelAliases).forEach(([label, key]) => {
            dictionary[label] = dictionary[key];
        });
    });
    const profileLabels = {
        "Not provided": {
            en: "Not provided", hi: "उपलब्ध नहीं", mr: "उपलब्ध नाही", pa: "ਉਪਲਬਧ ਨਹੀਂ",
            gu: "ઉપલબ્ધ નથી", bn: "পাওয়া যায়নি", te: "అందుబాటులో లేదు", ta: "கிடைக்கவில்லை",
            kn: "ಲಭ್ಯವಿಲ್ಲ", ml: "ലഭ്യമല്ല", or: "ଉପଲବ୍ଧ ନାହିଁ", as: "উপলব্ধ ନহয়",
            ur: "دستیاب نہیں"
        },
        "Farmer profile": {
            en: "Farmer profile", hi: "किसान प्रोफ़ाइल", mr: "शेतकरी प्रोफाइल", pa: "ਕਿਸਾਨ ਪ੍ਰੋਫ਼ਾਈਲ",
            gu: "ખેડૂત પ્રોફાઇલ", bn: "কৃষক প্রোফাইল", te: "రైతు ప్రొఫైల్", ta: "விவசாயி சுயவிவரம்",
            kn: "ರೈತರ ಪ್ರೊಫೈಲ್", ml: "കർഷക പ്രൊഫൈൽ", or: "କୃଷକ ପ୍ରୋଫାଇଲ୍",
            as: "কৃষকৰ প্ৰ’ফাইল", ur: "کسان پروفائل"
        },
        "Log Out": {
            en: "Log Out", hi: "लॉग आउट", mr: "लॉग आउट", pa: "ਲਾਗ ਆਉਟ", gu: "લૉગ ਆઉਟ",
            bn: "লগ আউট", te: "లాగ్ అవుట్", ta: "வெளியேறு", kn: "ಲಾಗ್ ಔಟ್",
            ml: "ലോഗ് ഔട്ട്", or: "ଲଗ୍ ଆଉଟ୍", as: "ଲଗ୍ ଆଉଟ୍", ur: "لاگ آؤٹ"
        },
        "Open official scheme portal": {
            en: "Open official scheme portal", hi: "आधिकारिक योजना पोर्टल खोलें",
            mr: "अधिकृत योजना पोर्टल उघडा", pa: "ਅਧਿਕਾਰਤ ਯੋਜਨਾ ਪੋਰਟਲ ਖੋਲ੍ਹੋ",
            gu: "સત્તાવાર યોજના પોર્ટલ ખોલો", bn: "সরকারি প্রকল্পের পোর্টাল খুলুন",
            te: "అధికారిక పథకం పోర్టల్‌ను తెరవండి", ta: "அதிகாரப்பூர்வத் திட்ட இணையதளத்தைத் திறக்கவும்",
            kn: "ಅಧಿಕೃತ ಯೋಜನಾ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ", ml: "ഔദ്യോഗിക പദ്ധതി പോർട്ടൽ തുറക്കുക",
            or: "ସରକାରୀ ଯୋଜନା ପୋର୍ଟାଲ୍ ଖୋଲନ୍ତୁ", as: "চৰকাৰী আঁচনিৰ পৰ্টেল খোলক",
            ur: "سرکاری اسکیم کا پورٹل کھولیں"
        }
    };
    Object.entries(dictionaries).forEach(([lang, dictionary]) => {
        Object.entries(profileLabels).forEach(([label, translations]) => {
            dictionary[label] = translations[lang];
        });
    });
    const controlTranslations = {
        hi: {
            "Log in with": "इससे लॉग इन करें", "Verify with": "इससे सत्यापित करें",
            "Enter your registered email": "अपना पंजीकृत ईमेल दर्ज करें", "Enter your password": "अपना पासवर्ड दर्ज करें",
            "Enter your registered 10-digit mobile number": "अपना पंजीकृत 10 अंकों का मोबाइल नंबर दर्ज करें",
            "Enter 10-digit mobile number": "10 अंकों का मोबाइल नंबर दर्ज करें", "Enter your email address": "अपना ईमेल पता दर्ज करें",
            "Enter your full name": "अपना पूरा नाम दर्ज करें", "Enter the 6-digit code": "6 अंकों का कोड दर्ज करें",
            "Enter the 6-digit SMS code": "6 अंकों का SMS कोड दर्ज करें", "Send verification code": "सत्यापन कोड भेजें",
            "Email Verification Code": "ईमेल सत्यापन कोड", "SMS Verification Code": "SMS सत्यापन कोड", "Choose language": "भाषा चुनें",
            "Change color theme": "रंग थीम बदलें", "Tap to switch theme": "थीम बदलने के लिए टैप करें",
            "Tap to Change Theme": "थीम बदलने के लिए टैप करें", "Hear login guidance": "लॉगिन मार्गदर्शन सुनें",
            "Hear sign-up guidance": "साइन-अप मार्गदर्शन सुनें", "Take Photo": "फ़ोटो लें", "Attach File": "फ़ाइल जोड़ें",
            "Voice Input": "आवाज़ से इनपुट", "Send": "भेजें", "Close Player": "प्लेयर बंद करें",
            "SMS to mobile": "मोबाइल पर SMS", "Select your state": "अपना राज्य चुनें", "At least 6 characters": "कम से कम 6 अक्षर",
            "Your mobile number will be used as your sign-in method.": "आपका मोबाइल नंबर लॉगिन के लिए उपयोग किया जाएगा।"
        },
        mr: {
            "Log in with": "याद्वारे लॉग इन करा", "Verify with": "याद्वारे पडताळणी करा",
            "Enter your registered email": "तुमचा नोंदणीकृत ईमेल टाका", "Enter your password": "तुमचा पासवर्ड टाका",
            "Enter your registered 10-digit mobile number": "तुमचा नोंदणीकृत 10 अंकी मोबाइल क्रमांक टाका",
            "Enter 10-digit mobile number": "10 अंकी मोबाइल क्रमांक टाका", "Enter your email address": "तुमचा ईमेल पत्ता टाका",
            "Enter your full name": "तुमचे पूर्ण नाव टाका", "Enter the 6-digit code": "6 अंकी कोड टाका",
            "Enter the 6-digit SMS code": "6 अंकी SMS कोड टाका", "Send verification code": "पडताळणी कोड पाठवा",
            "Email Verification Code": "ईमेल पडताळणी कोड", "SMS Verification Code": "SMS पडताळणी कोड", "Choose language": "भाषा निवडा",
            "Change color theme": "रंगसंगती बदला", "Tap to switch theme": "रंगसंगती बदलण्यासाठी टॅप करा",
            "Tap to Change Theme": "रंगसंगती बदलण्यासाठी टॅप करा", "Hear login guidance": "लॉगिन मार्गदर्शन ऐका",
            "Hear sign-up guidance": "नोंदणी मार्गदर्शन ऐका", "Take Photo": "फोटो काढा", "Attach File": "फाइल जोडा",
            "Voice Input": "आवाज इनपुट", "Send": "पाठवा", "Close Player": "प्लेअर बंद करा",
            "SMS to mobile": "मोबाइलवर SMS", "Select your state": "तुमचे राज्य निवडा", "At least 6 characters": "किमान 6 अक्षरे",
            "Your mobile number will be used as your sign-in method.": "तुमचा मोबाइल क्रमांक लॉगिनसाठी वापरला जाईल."
        },
        pa: {
            "Log in with": "ਇਸ ਨਾਲ ਲਾਗ ਇਨ ਕਰੋ", "Verify with": "ਇਸ ਨਾਲ ਪੁਸ਼ਟੀ ਕਰੋ",
            "Enter your registered email": "ਆਪਣੀ ਰਜਿਸਟਰ ਕੀਤੀ ਈਮੇਲ ਦਰਜ ਕਰੋ", "Enter your password": "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
            "Enter your registered 10-digit mobile number": "ਆਪਣਾ ਰਜਿਸਟਰ ਕੀਤਾ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",
            "Enter 10-digit mobile number": "10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ", "Enter your email address": "ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ",
            "Enter your full name": "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ", "Enter the 6-digit code": "6 ਅੰਕਾਂ ਦਾ ਕੋਡ ਦਰਜ ਕਰੋ",
            "Enter the 6-digit SMS code": "6 ਅੰਕਾਂ ਦਾ SMS ਕੋਡ ਦਰਜ ਕਰੋ", "Send verification code": "ਤਸਦੀਕ ਕੋਡ ਭੇਜੋ",
            "Email Verification Code": "ਈਮੇਲ ਤਸਦੀਕ ਕੋਡ", "SMS Verification Code": "SMS ਤਸਦੀਕ ਕੋਡ", "Choose language": "ਭਾਸ਼ਾ ਚੁਣੋ",
            "Change color theme": "ਰੰਗ ਥੀਮ ਬਦਲੋ", "Tap to switch theme": "ਥੀਮ ਬਦਲਣ ਲਈ ਟੈਪ ਕਰੋ",
            "Tap to Change Theme": "ਥੀਮ ਬਦਲਣ ਲਈ ਟੈਪ ਕਰੋ", "Hear login guidance": "ਲਾਗਇਨ ਲਈ ਮਦਦ ਸੁਣੋ",
            "Hear sign-up guidance": "ਸਾਈਨ-ਅੱਪ ਲਈ ਮਦਦ ਸੁਣੋ", "Take Photo": "ਫੋਟੋ ਖਿੱਚੋ", "Attach File": "ਫਾਈਲ ਜੋੜੋ",
            "Voice Input": "ਆਵਾਜ਼ ਇਨਪੁੱਟ", "Send": "ਭੇਜੋ", "Close Player": "ਪਲੇਅਰ ਬੰਦ ਕਰੋ",
            "SMS to mobile": "ਮੋਬਾਈਲ ਤੇ SMS", "Select your state": "ਆਪਣਾ ਰਾਜ ਚੁਣੋ", "At least 6 characters": "ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰ",
            "Your mobile number will be used as your sign-in method.": "ਤੁਹਾਡਾ ਮੋਬਾਈਲ ਨੰਬਰ ਲਾਗਇਨ ਲਈ ਵਰਤਿਆ ਜਾਵੇਗਾ।"
        },
        gu: {
            "Log in with": "આના દ્વારા લૉગ ઇન કરો", "Verify with": "આના દ્વારા ચકાસો",
            "Enter your registered email": "તમારું નોંધાયેલ ઇમેઇલ દાખલ કરો", "Enter your password": "તમારો પાસવર્ડ દાખલ કરો",
            "Enter your registered 10-digit mobile number": "તમારો નોંધાયેલ 10 અંકનો મોબાઇલ નંબર દાખલ કરો",
            "Enter 10-digit mobile number": "10 અંકનો મોબાઇલ નંબર દાખલ કરો", "Enter your email address": "તમારું ઇમેઇલ સરનામું દાખલ કરો",
            "Enter your full name": "તમારું પૂરું નામ દાખલ કરો", "Enter the 6-digit code": "6 અંકનો કોડ દાખલ કરો",
            "Enter the 6-digit SMS code": "6 અંકનો SMS કોડ દાખલ કરો", "Send verification code": "ચકાસણી કોડ મોકલો",
            "Email Verification Code": "ઇમેઇલ ચકાસણી કોડ", "SMS Verification Code": "SMS ચકાસણી કોડ", "Choose language": "ભાષા પસંદ કરો",
            "Change color theme": "રંગ થીમ બદલો", "Tap to switch theme": "થીમ બદલવા માટે ટૅપ કરો",
            "Tap to Change Theme": "થીમ બદલવા માટે ટૅપ કરો", "Hear login guidance": "લૉગ ઇન માર્ગદર્શન સાંભળો",
            "Hear sign-up guidance": "સાઇન અપ માર્ગદર્શન સાંભળો", "Take Photo": "ફોટો લો", "Attach File": "ફાઇલ જોડો",
            "Voice Input": "અવાજ ઇનપુટ", "Send": "મોકલો", "Close Player": "પ્લેયર બંધ કરો",
            "SMS to mobile": "મોબાઇલ પર SMS", "Select your state": "તમારું રાજ્ય પસંદ કરો", "At least 6 characters": "ઓછામાં ઓછા 6 અક્ષરો",
            "Your mobile number will be used as your sign-in method.": "તમારો મોબાઇલ નંબર લૉગ ઇન માટે વપરાશે."
        },
        bn: {
            "Log in with": "যে মাধ্যমে লগ ইন করবেন", "Verify with": "যে মাধ্যমে যাচাই করবেন",
            "Enter your registered email": "আপনার নিবন্ধিত ইমেল লিখুন", "Enter your password": "আপনার পাসওয়ার্ড লিখুন",
            "Enter your registered 10-digit mobile number": "আপনার নিবন্ধিত ১০ সংখ্যার মোবাইল নম্বর লিখুন",
            "Enter 10-digit mobile number": "১০ সংখ্যার মোবাইল নম্বর লিখুন", "Enter your email address": "আপনার ইমেল ঠিকানা লিখুন",
            "Enter your full name": "আপনার পুরো নাম লিখুন", "Enter the 6-digit code": "৬ সংখ্যার কোড লিখুন",
            "Enter the 6-digit SMS code": "৬ সংখ্যার SMS কোড লিখুন", "Send verification code": "যাচাই কোড পাঠান",
            "Email Verification Code": "ইমেল যাচাই কোড", "SMS Verification Code": "SMS যাচাই কোড", "Choose language": "ভাষা নির্বাচন করুন",
            "Change color theme": "রঙের থিম বদলান", "Tap to switch theme": "থিম বদলাতে ট্যাপ করুন",
            "Tap to Change Theme": "থিম বদলাতে ট্যাপ করুন", "Hear login guidance": "লগইন নির্দেশনা শুনুন",
            "Hear sign-up guidance": "সাইন আপ নির্দেশনা শুনুন", "Take Photo": "ছবি তুলুন", "Attach File": "ফাইল যুক্ত করুন",
            "Voice Input": "ভয়েস ইনপুট", "Send": "পাঠান", "Close Player": "প্লেয়ার বন্ধ করুন",
            "SMS to mobile": "মোবাইলে SMS", "Select your state": "আপনার রাজ্য নির্বাচন করুন", "At least 6 characters": "অন্তত ৬টি অক্ষর",
            "Your mobile number will be used as your sign-in method.": "আপনার মোবাইল নম্বর লগইনের জন্য ব্যবহৃত হবে।"
        },
        te: {
            "Log in with": "దీనితో లాగిన్ అవ్వండి", "Verify with": "దీనితో ధృవీకరించండి",
            "Enter your registered email": "మీ నమోదిత ఇమెయిల్‌ను నమోదు చేయండి", "Enter your password": "మీ పాస్‌వర్డ్‌ను నమోదు చేయండి",
            "Enter your registered 10-digit mobile number": "మీ నమోదిత 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి",
            "Enter 10-digit mobile number": "10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి", "Enter your email address": "మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి",
            "Enter your full name": "మీ పూర్తి పేరును నమోదు చేయండి", "Enter the 6-digit code": "6 అంకెల కోడ్‌ను నమోదు చేయండి",
            "Enter the 6-digit SMS code": "6 అంకెల SMS కోడ్‌ను నమోదు చేయండి", "Send verification code": "ధృవీకరణ కోడ్ పంపండి",
            "Email Verification Code": "ఇమెయిల్ ధృవీకరణ కోడ్", "SMS Verification Code": "SMS ధృవీకరణ కోడ్", "Choose language": "భాషను ఎంచుకోండి",
            "Change color theme": "రంగు థీమ్ మార్చండి", "Tap to switch theme": "థీమ్ మార్చడానికి నొక్కండి",
            "Tap to Change Theme": "థీమ్ మార్చడానికి నొక్కండి", "Hear login guidance": "లాగిన్ మార్గదర్శకాన్ని వినండి",
            "Hear sign-up guidance": "సైన్-అప్ మార్గదర్శకాన్ని వినండి", "Take Photo": "ఫోటో తీయండి", "Attach File": "ఫైల్ జోడించండి",
            "Voice Input": "వాయిస్ ఇన్‌పుట్", "Send": "పంపండి", "Close Player": "ప్లేయర్‌ను మూసివేయండి",
            "SMS to mobile": "మొబైల్‌కు SMS", "Select your state": "మీ రాష్ట్రాన్ని ఎంచుకోండి", "At least 6 characters": "కనీసం 6 అక్షరాలు",
            "Your mobile number will be used as your sign-in method.": "మీ మొబైల్ నంబర్ సైన్-ఇన్ కోసం ఉపయోగించబడుతుంది."
        },
        ta: {
            "Log in with": "இதன் மூலம் உள்நுழைக", "Verify with": "இதன் மூலம் சரிபார்க்கவும்",
            "Enter your registered email": "பதிவுசெய்த மின்னஞ்சலை உள்ளிடவும்", "Enter your password": "கடவுச்சொல்லை உள்ளிடவும்",
            "Enter your registered 10-digit mobile number": "பதிவுசெய்த 10 இலக்க கைப்பேசி எண்ணை உள்ளிடவும்",
            "Enter 10-digit mobile number": "10 இலக்க கைப்பேசி எண்ணை உள்ளிடவும்", "Enter your email address": "மின்னஞ்சல் முகவரியை உள்ளிடவும்",
            "Enter your full name": "முழுப் பெயரை உள்ளிடவும்", "Enter the 6-digit code": "6 இலக்கக் குறியீட்டை உள்ளிடவும்",
            "Enter the 6-digit SMS code": "6 இலக்க SMS குறியீட்டை உள்ளிடவும்", "Send verification code": "சரிபார்ப்புக் குறியீட்டை அனுப்பவும்",
            "Email Verification Code": "மின்னஞ்சல் சரிபார்ப்புக் குறியீடு", "SMS Verification Code": "SMS சரிபார்ப்புக் குறியீடு", "Choose language": "மொழியைத் தேர்ந்தெடுக்கவும்",
            "Change color theme": "வண்ணத் தோற்றத்தை மாற்றவும்", "Tap to switch theme": "தோற்றத்தை மாற்றத் தட்டவும்",
            "Tap to Change Theme": "தோற்றத்தை மாற்றத் தட்டவும்", "Hear login guidance": "உள்நுழைவு வழிகாட்டலைக் கேட்கவும்",
            "Hear sign-up guidance": "பதிவு வழிகாட்டலைக் கேட்கவும்", "Take Photo": "புகைப்படம் எடுக்கவும்", "Attach File": "கோப்பை இணைக்கவும்",
            "Voice Input": "குரல் உள்ளீடு", "Send": "அனுப்பு", "Close Player": "பிளேயரை மூடவும்",
            "SMS to mobile": "கைப்பேசிக்கு SMS", "Select your state": "உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்", "At least 6 characters": "குறைந்தது 6 எழுத்துகள்",
            "Your mobile number will be used as your sign-in method.": "உங்கள் கைப்பேசி எண் உள்நுழைவுக்குப் பயன்படுத்தப்படும்."
        },
        kn: {
            "Log in with": "ಇದರೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ", "Verify with": "ಇದರೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ",
            "Enter your registered email": "ನೋಂದಾಯಿತ ಇಮೇಲ್ ನಮೂದಿಸಿ", "Enter your password": "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
            "Enter your registered 10-digit mobile number": "ನೋಂದಾಯಿತ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
            "Enter 10-digit mobile number": "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", "Enter your email address": "ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ",
            "Enter your full name": "ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", "Enter the 6-digit code": "6 ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ",
            "Enter the 6-digit SMS code": "6 ಅಂಕಿಯ SMS ಕೋಡ್ ನಮೂದಿಸಿ", "Send verification code": "ಪರಿಶೀಲನಾ ಕೋಡ್ ಕಳುಹಿಸಿ",
            "Email Verification Code": "ಇಮೇಲ್ ಪರಿಶೀಲನಾ ಕೋಡ್", "SMS Verification Code": "SMS ಪರಿಶೀಲನಾ ಕೋಡ್", "Choose language": "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            "Change color theme": "ಬಣ್ಣದ ಥೀಮ್ ಬದಲಾಯಿಸಿ", "Tap to switch theme": "ಥೀಮ್ ಬದಲಾಯಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
            "Tap to Change Theme": "ಥೀಮ್ ಬದಲಾಯಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ", "Hear login guidance": "ಲಾಗಿನ್ ಮಾರ್ಗದರ್ಶನ ಕೇಳಿ",
            "Hear sign-up guidance": "ಸೈನ್ ಅಪ್ ಮಾರ್ಗದರ್ಶನ ಕೇಳಿ", "Take Photo": "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ", "Attach File": "ಫೈಲ್ ಸೇರಿಸಿ",
            "Voice Input": "ಧ್ವನಿ ಇನ್‌ಪುಟ್", "Send": "ಕಳುಹಿಸಿ", "Close Player": "ಪ್ಲೇಯರ್ ಮುಚ್ಚಿ",
            "SMS to mobile": "ಮೊಬೈಲ್‌ಗೆ SMS", "Select your state": "ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", "At least 6 characters": "ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು",
            "Your mobile number will be used as your sign-in method.": "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಲಾಗಿನ್‌ಗಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ."
        },
        ml: {
            "Log in with": "ഇതുപയോഗിച്ച് ലോഗിൻ ചെയ്യുക", "Verify with": "ഇതുപയോഗിച്ച് സ്ഥിരീകരിക്കുക",
            "Enter your registered email": "രജിസ്റ്റർ ചെയ്ത ഇമെയിൽ നൽകുക", "Enter your password": "പാസ്‌വേഡ് നൽകുക",
            "Enter your registered 10-digit mobile number": "രജിസ്റ്റർ ചെയ്ത 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക",
            "Enter 10-digit mobile number": "10 അക്ക മൊബൈൽ നമ്പർ നൽകുക", "Enter your email address": "ഇമെയിൽ വിലാസം നൽകുക",
            "Enter your full name": "പൂർണ്ണ പേര് നൽകുക", "Enter the 6-digit code": "6 അക്ക കോഡ് നൽകുക",
            "Enter the 6-digit SMS code": "6 അക്ക SMS കോഡ് നൽകുക", "Send verification code": "സ്ഥിരീകരണ കോഡ് അയയ്ക്കുക",
            "Email Verification Code": "ഇമെയിൽ സ്ഥിരീകരണ കോഡ്", "SMS Verification Code": "SMS സ്ഥിരീകരണ കോഡ്", "Choose language": "ഭാഷ തിരഞ്ഞെടുക്കുക",
            "Change color theme": "നിറത്തിന്റെ തീം മാറ്റുക", "Tap to switch theme": "തീം മാറ്റാൻ ടാപ്പ് ചെയ്യുക",
            "Tap to Change Theme": "തീം മാറ്റാൻ ടാപ്പ് ചെയ്യുക", "Hear login guidance": "ലോഗിൻ നിർദ്ദേശം കേൾക്കുക",
            "Hear sign-up guidance": "സൈൻ-അപ്പ് നിർദ്ദേശം കേൾക്കുക", "Take Photo": "ഫോട്ടോ എടുക്കുക", "Attach File": "ഫയൽ ചേർക്കുക",
            "Voice Input": "ശബ്ദ ഇൻപുട്ട്", "Send": "അയയ്ക്കുക", "Close Player": "പ്ലെയർ അടയ്ക്കുക",
            "SMS to mobile": "മൊബൈലിലേക്ക് SMS", "Select your state": "നിങ്ങളുടെ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", "At least 6 characters": "കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ",
            "Your mobile number will be used as your sign-in method.": "നിങ്ങളുടെ മൊബൈൽ നമ്പർ ലോഗിനായി ഉപയോഗിക്കും."
        },
        or: {
            "Log in with": "ଏହା ମାଧ୍ୟମରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ", "Verify with": "ଏହା ମାଧ୍ୟମରେ ଯାଞ୍ଚ କରନ୍ତୁ",
            "Enter your registered email": "ଆପଣଙ୍କ ପଞ୍ଜୀକୃତ ଇମେଲ୍ ଲେଖନ୍ତୁ", "Enter your password": "ଆପଣଙ୍କ ପାସୱାର୍ଡ ଲେଖନ୍ତୁ",
            "Enter your registered 10-digit mobile number": "ପଞ୍ଜୀକୃତ 10 ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଲେଖନ୍ତୁ",
            "Enter 10-digit mobile number": "10 ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଲେଖନ୍ତୁ", "Enter your email address": "ଇମେଲ୍ ଠିକଣା ଲେଖନ୍ତୁ",
            "Enter your full name": "ପୂରା ନାମ ଲେଖନ୍ତୁ", "Enter the 6-digit code": "6 ଅଙ୍କର କୋଡ୍ ଲେଖନ୍ତୁ",
            "Enter the 6-digit SMS code": "6 ଅଙ୍କର SMS କୋଡ୍ ଲେଖନ୍ତୁ", "Send verification code": "ଯାଞ୍ଚ କୋଡ୍ ପଠାନ୍ତୁ",
            "Email Verification Code": "ଇମେଲ୍ ଯାଞ୍ଚ କୋଡ୍", "SMS Verification Code": "SMS ଯାଞ୍ଚ କୋଡ୍", "Choose language": "ଭାଷା ବାଛନ୍ତୁ",
            "Change color theme": "ରଙ୍ଗ ଥିମ୍ ବଦଳାନ୍ତୁ", "Tap to switch theme": "ଥିମ୍ ବଦଳାଇବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ",
            "Tap to Change Theme": "ଥିମ୍ ବଦଳାଇବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ", "Hear login guidance": "ଲଗ୍ ଇନ୍ ମାର୍ଗଦର୍ଶନ ଶୁଣନ୍ତୁ",
            "Hear sign-up guidance": "ସାଇନ୍ ଅପ୍ ମାର୍ଗଦର୍ଶନ ଶୁଣନ୍ତୁ", "Take Photo": "ଫଟୋ ନିଅନ୍ତୁ", "Attach File": "ଫାଇଲ୍ ଯୋଡ଼ନ୍ତୁ",
            "Voice Input": "ଭଏସ୍ ଇନପୁଟ୍", "Send": "ପଠାନ୍ତୁ", "Close Player": "ପ୍ଲେୟର ବନ୍ଦ କରନ୍ତୁ",
            "SMS to mobile": "ମୋବାଇଲକୁ SMS", "Select your state": "ଆପଣଙ୍କ ରାଜ୍ୟ ବାଛନ୍ତୁ", "At least 6 characters": "ଅତି କମରେ 6ଟି ଅକ୍ଷର",
            "Your mobile number will be used as your sign-in method.": "ଆପଣଙ୍କ ମୋବାଇଲ୍ ନମ୍ବର ଲଗ୍ ଇନ୍ ପାଇଁ ବ୍ୟବହୃତ ହେବ।"
        },
        as: {
            "Log in with": "ইয়াৰ জৰিয়তে লগ ইন কৰক", "Verify with": "ইয়াৰ জৰিয়তে পৰীক্ষা কৰক",
            "Enter your registered email": "আপোনাৰ পঞ্জীয়নভুক্ত ইমেইল লিখক", "Enter your password": "আপোনাৰ পাছৱৰ্ড লিখক",
            "Enter your registered 10-digit mobile number": "পঞ্জীয়নভুক্ত 10 সংখ্যাৰ ম’বাইল নম্বৰ লিখক",
            "Enter 10-digit mobile number": "10 সংখ্যাৰ ম’বাইল নম্বৰ লিখক", "Enter your email address": "ইমেইল ঠিকনা লিখক",
            "Enter your full name": "সম্পূৰ্ণ নাম লিখক", "Enter the 6-digit code": "6 সংখ্যাৰ কোড লিখক",
            "Enter the 6-digit SMS code": "6 সংখ্যাৰ SMS কোড লিখক", "Send verification code": "পৰীক্ষা কোড পঠিয়াওক",
            "Email Verification Code": "ইমেইল পৰীক্ষা কোড", "SMS Verification Code": "SMS পৰীক্ষা কোড", "Choose language": "ভাষা বাছনি কৰক",
            "Change color theme": "ৰঙৰ থীম সলনি কৰক", "Tap to switch theme": "থীম সলনি কৰিবলৈ টেপ কৰক",
            "Tap to Change Theme": "থীম সলনি কৰিবলৈ টেপ কৰক", "Hear login guidance": "লগ ইন নিৰ্দেশনা শুনক",
            "Hear sign-up guidance": "ছাইন আপ নিৰ্দেশনা শুনক", "Take Photo": "ফটো তোলক", "Attach File": "ফাইল সংলগ্ন কৰক",
            "Voice Input": "কণ্ঠ ইনপুট", "Send": "পঠিয়াওক", "Close Player": "প্লেয়াৰ বন্ধ কৰক",
            "SMS to mobile": "ম’বাইললৈ SMS", "Select your state": "আপোনাৰ ৰাজ্য বাছনি কৰক", "At least 6 characters": "কমেও 6টা আখৰ",
            "Your mobile number will be used as your sign-in method.": "আপোনাৰ ম’বাইল নম্বৰ লগ ইন কৰিবলৈ ব্যৱহাৰ কৰা হ’ব।"
        },
        ur: {
            "Log in with": "اس کے ذریعے لاگ ان کریں", "Verify with": "اس کے ذریعے تصدیق کریں",
            "Enter your registered email": "اپنا رجسٹرڈ ای میل درج کریں", "Enter your password": "اپنا پاس ورڈ درج کریں",
            "Enter your registered 10-digit mobile number": "اپنا رجسٹرڈ 10 ہندسوں کا موبائل نمبر درج کریں",
            "Enter 10-digit mobile number": "10 ہندسوں کا موبائل نمبر درج کریں", "Enter your email address": "اپنا ای میل پتہ درج کریں",
            "Enter your full name": "اپنا پورا نام درج کریں", "Enter the 6-digit code": "6 ہندسوں کا کوڈ درج کریں",
            "Enter the 6-digit SMS code": "6 ہندسوں کا SMS کوڈ درج کریں", "Send verification code": "تصدیقی کوڈ بھیجیں",
            "Email Verification Code": "ای میل تصدیقی کوڈ", "SMS Verification Code": "SMS تصدیقی کوڈ", "Choose language": "زبان منتخب کریں",
            "Change color theme": "رنگوں کا تھیم تبدیل کریں", "Tap to switch theme": "تھیم بدلنے کے لیے ٹیپ کریں",
            "Tap to Change Theme": "تھیم بدلنے کے لیے ٹیپ کریں", "Hear login guidance": "لاگ ان کی رہنمائی سنیں",
            "Hear sign-up guidance": "سائن اپ کی رہنمائی سنیں", "Take Photo": "تصویر لیں", "Attach File": "فائل منسلک کریں",
            "Voice Input": "آواز سے اندراج", "Send": "بھیجیں", "Close Player": "پلیئر بند کریں",
            "SMS to mobile": "موبائل پر SMS", "Select your state": "اپنی ریاست منتخب کریں", "At least 6 characters": "کم از کم 6 حروف",
            "Your mobile number will be used as your sign-in method.": "آپ کا موبائل نمبر لاگ ان کے لیے استعمال ہوگا۔"
        }
    };
    Object.entries(controlTranslations).forEach(([lang, translations]) => {
        Object.assign(dictionaries[lang], translations);
    });
    const textSources = new WeakMap();
    const translatedTexts = new WeakMap();
    const attributeSources = new WeakMap();
    const iconPrefix = /^[^\p{L}\p{N}]+/u;

    function activeLanguage() {
        return localStorage.getItem("kisaanLang") || localStorage.getItem("aiLanguage") || "en";
    }

    function translateText(text, lang) {
        const prefix = text.match(iconPrefix)?.[0] || "";
        const phrase = text.slice(prefix.length).trim();
        const translation = dictionaries[lang]?.[phrase];
        return translation ? `${prefix}${translation}` : text;
    }

    function applyLanguage(root, lang) {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const current = node.data.trim();
            if (!current) continue;
            const source = textSources.get(node) || current;
            textSources.set(node, source);
            const translated = translateText(source, lang);
            if (current === source || current === translatedTexts.get(node)) {
                if (node.data !== translated) node.data = translated;
                translatedTexts.set(node, translated);
            }
        }

        root.querySelectorAll?.("[aria-label], [title], input[placeholder], textarea[placeholder]").forEach((element) => {
            ["aria-label", "title", "placeholder"].forEach((attribute) => {
                const current = element.getAttribute(attribute);
                if (current === null) return;
                let sources = attributeSources.get(element);
                if (!sources) {
                    sources = {};
                    attributeSources.set(element, sources);
                }
                const source = sources[attribute]?.source || current;
                const previousTranslation = sources[attribute]?.translated;
                const translated = translateText(source, lang);
                if (current === source || current === previousTranslation) {
                    if (current !== translated) element.setAttribute(attribute, translated);
                    sources[attribute] = { source, translated };
                }
            });
        });
    }

    window.setPortalLanguage = (lang) => {
        if (!dictionaries[lang]) return;
        if (localStorage.getItem("aiLanguage") !== lang) localStorage.setItem("aiLanguage", lang);
        if (localStorage.getItem("kisaanLang") !== lang) localStorage.setItem("kisaanLang", lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
        document.querySelectorAll("#authLanguage, #langSelect, #langToggle").forEach((select) => {
            if ([...select.options].some((option) => option.value === lang)) select.value = lang;
        });
        applyLanguage(document.body, lang);
        window.dispatchEvent(new CustomEvent("portal-language-changed", { detail: { lang } }));
        if (window.parent !== window) {
            window.parent.postMessage({ type: "kisaan-language-changed", lang }, location.origin);
        }
    };

    window.portalTranslateText = (text, lang = activeLanguage()) => translateText(text, lang);
    document.addEventListener("change", (event) => {
        if (event.target.matches("#authLanguage, #langSelect, #langToggle")) {
            window.setPortalLanguage(event.target.value);
        }
    });
    window.addEventListener("storage", (event) => {
        if (event.key === "kisaanLang" || event.key === "aiLanguage") {
            window.setPortalLanguage(event.newValue || "en");
        }
    });

    const observer = new MutationObserver((records) => {
        if (records.some((record) => record.type === "childList" || record.type === "characterData")) {
            applyLanguage(document.body, activeLanguage());
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        window.setPortalLanguage(activeLanguage());
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }, { once: true });
})();
