document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Header Scroll Effect (Light Theme) ---
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // --- 2. Advanced Scroll Animations (Intersection Observer) ---
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

    handleScrollAnimation();
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // --- 3. Plan Selection Logic ---
    const planButtons = document.querySelectorAll('.plan-btn');
    const businessSelect = document.getElementById('businessType');
    const contactSection = document.getElementById('contact');

    planButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetPlan = e.target.getAttribute('data-plan');
            
            if(targetPlan) {
                businessSelect.value = targetPlan;
            }

            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            businessSelect.classList.add('ring-2', 'ring-yellow-400');
            setTimeout(() => businessSelect.classList.remove('ring-2', 'ring-yellow-400'), 1500);
        });
    });

    // --- 4. Form Submission Handling ---
    const agencyForm = document.getElementById('agencyForm');

    agencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value;
        const phone = document.getElementById('clientPhone').value;
        const selection = businessSelect.value;

        alert(`Brief Received, ${name}.\n\nSujeeth and Nithilan will review the parameters for your ${selection} and coordinate with you at ${phone} shortly.`);
        
        agencyForm.reset();
    });
});