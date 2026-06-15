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

    // --- 3. WhatsApp Form Redirection Logic ---
    const agencyForm = document.getElementById('agencyForm');

    if(agencyForm) {
        agencyForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Get user inputs
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const message = document.getElementById('clientMessage').value.trim();

            // Construct the pre-defined message
            const whatsappText = `Hello Veloce Team! 👋\n\nMy name is *${name}*.\nMy contact number is: ${phone}\n\nI am reaching out regarding a website project. Here are my details/requirements:\n"${message}"\n\nLooking forward to discussing this!`;
            
            // Encode the message so it works safely in a URL
            const encodedText = encodeURIComponent(whatsappText);
            
            // The target phone number (without the + symbol, just country code and number)
            const whatsappNumber = "919789153001";
            
            // Generate the final wa.me link
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset form after opening WhatsApp
            agencyForm.reset();
        });
    }
});