document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Header Scroll Effect ---
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // --- 2. Advanced Scroll Animations ---
    const scrollElements = document.querySelectorAll(".scroll-element");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add("scrolled");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
    }

    handleScrollAnimation(); // Trigger on load
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // --- 3. WhatsApp & Email Routing Logic ---
    const agencyForm = document.getElementById('agencyForm');
    const emailSubmitBtn = document.getElementById('emailSubmitBtn');

    if(agencyForm) {
        
        // Handle WhatsApp Submission
        agencyForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const message = document.getElementById('clientMessage').value.trim();

            const whatsappText = `Hello NS Web Creation Team! 👋\n\nMy name is *${name}*.\nMy contact number is: ${phone}\n\nI am reaching out regarding a website project. Here are my details/requirements:\n"${message}"\n\nLooking forward to discussing this!`;
            
            const encodedText = encodeURIComponent(whatsappText);
            const whatsappNumber = "918248274649";
            
            const appUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedText}`;
            const webUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            const submitBtn = agencyForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.textContent = "Connecting...";
            submitBtn.disabled = true;

            let appOpened = false;

            window.addEventListener('blur', () => { appOpened = true; });
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) { appOpened = true; }
            });

            setTimeout(() => {
                window.location.href = appUrl;

                setTimeout(() => {
                    if (!appOpened) {
                        window.open(webUrl, '_blank');
                    }
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    agencyForm.reset();
                }, 2000); 

            }, 500);
        });

        // Handle Email Submission
        if(emailSubmitBtn) {
            emailSubmitBtn.addEventListener('click', () => {
                // Ensure required fields are filled out before drafting email
                if(!agencyForm.checkValidity()) {
                    agencyForm.reportValidity();
                    return;
                }

                const name = document.getElementById('clientName').value.trim();
                const phone = document.getElementById('clientPhone').value.trim();
                const message = document.getElementById('clientMessage').value.trim();

                const emailSubject = `New Website Project Inquiry from ${name}`;
                const emailBody = `Hello NS Web Creation Team,\n\nMy name is ${name}.\nMy contact number is: ${phone}\n\nI am reaching out regarding a website project. Here are my details/requirements:\n"${message}"\n\nLooking forward to discussing this!`;
                
                const mailtoLink = `mailto:nswebcreation@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Open the user's default email client
                window.location.href = mailtoLink;
                
                // Optionally reset the form after they click the email button
                setTimeout(() => {
                    agencyForm.reset();
                }, 1000);
            });
        }
    }
});