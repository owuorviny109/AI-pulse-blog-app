document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navUl = document.querySelector('header nav ul.nav-links');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const blogPostToggles = document.querySelectorAll('.toggle-content-btn');
    const typingTextElement = document.getElementById('typing-text');
    const currentYearSpan = document.getElementById('current-year');

    // Impact Section Elements
    const clickableImpacts = document.querySelectorAll('.clickable-impact');
    const impactDetailView = document.getElementById('impact-detail-view');
    const impactDetailContent = document.getElementById('impact-detail-content');
    const backToImpactGridBtn = document.getElementById('back-to-impact-grid');
    const impactGridContainer = document.querySelector('.impact-grid-container');

    // "What is AI?" Section Elements
    const clickableAiConcepts = document.querySelectorAll('.clickable-ai-concept');
    const aiConceptDetailView = document.getElementById('ai-concept-detail-view');
    const aiConceptDetailContent = document.getElementById('ai-concept-detail-content');
    const backToAiConceptsBtn = document.getElementById('back-to-ai-concepts');
    const aiConceptsGridContainer = document.querySelector('#what-is-ai .cards-container');


    // --- Initialize AOS (Animate on Scroll) Robustly ---
    try {
        if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
            AOS.init({
                duration: 700, // Slightly faster
                once: true,
                offset: 50, // Trigger animations a bit sooner
            });
        } else {
            console.warn('AOS library not loaded or AOS.init is not a function. Scroll animations will be disabled.');
        }
    } catch (e) {
        console.error('Error initializing AOS:', e);
    }

    // --- Update Current Year in Footer ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- SPA-like Navigation ---
    function showPage(targetId) {
        let foundTarget = false;
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active-page');
                foundTarget = true;

                // Reset views within specific pages when navigating to them
                if (targetId === 'impacts') {
                    if (impactGridContainer) impactGridContainer.classList.remove('hidden');
                    if (impactDetailView) {
                        impactDetailView.classList.remove('visible');
                        impactDetailView.style.display = 'none';
                    }
                }
                if (targetId === 'what-is-ai') {
                    if (aiConceptsGridContainer) aiConceptsGridContainer.classList.remove('hidden');
                    if (aiConceptDetailView) {
                        aiConceptDetailView.classList.remove('visible');
                        aiConceptDetailView.style.display = 'none';
                    }
                }

                // Scroll to the target section
                page.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                page.classList.remove('active-page');
            }
        });

        if (foundTarget) {
            navLinks.forEach(link => {
                link.classList.toggle('active-link', link.getAttribute('href') === `#${targetId}`);
            });
        } else {
            console.warn(`Navigation target #${targetId} not found in showPage.`);
        }

        if (navUl && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (document.getElementById(targetId)) {
                showPage(targetId);
            } else {
                console.warn(`Navigation target #${targetId} not found.`);
            }
        });
    });
    showPage('home'); // Initial page load


    // --- Dark Mode Toggle ---
    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            applyDarkMode(!isDarkMode);
        });
        if (localStorage.getItem('darkMode') === 'enabled') {
            applyDarkMode(true);
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default
        }
    }


    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && navUl) {
        mobileMenuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            mobileMenuToggle.innerHTML = navUl.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }


    // --- Scroll-to-Top Button ---
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.display = 'flex';
                requestAnimationFrame(() => scrollToTopButton.style.opacity = '1');
            } else {
                scrollToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (scrollToTopButton.style.opacity === '0') scrollToTopButton.style.display = 'none';
                }, 300); // Match CSS transition
            }
        });
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- Typing Animation for Hero Section ---
    if (typingTextElement) {
        const blogTitles = [
            "AI: Revolutionizing Industries...",
            "The Future of Work with AI...",
            "Ethical AI: A Crucial Discussion...",
            "Machine Learning Breakthroughs...",
            "AI in Everyday Life..."
        ];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            if (!document.body.contains(typingTextElement)) return; // Element removed
            const currentTitle = blogTitles[titleIndex];
            let typeSpeed = isDeleting ? 50 : 100;

            if (isDeleting) {
                typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % blogTitles.length;
                typeSpeed = 500; // Pause before typing new title
            }
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000); // Initial delay
    }


    // --- Blog Post Content Toggle ---
    blogPostToggles.forEach(button => {
        button.addEventListener('click', () => {
            const fullContent = button.nextElementSibling;
            if (fullContent && fullContent.classList.contains('full-content')) {
                const isShown = fullContent.classList.toggle('show');
                button.textContent = isShown ? 'Read Less' : 'Read More';
            }
        });
    });

    // --- Data for "What is AI?" Section Details ---
    const aiConceptDetailsData = {
        core: {
            title: "The Core of Artificial Intelligence",
            introduction: "Artificial Intelligence (AI) fundamentally refers to the capability of a computer or a robot controlled by a computer to perform tasks commonly associated with intelligent beings. It's a broad field encompassing various approaches and technologies, all aiming to create systems that can reason, learn, perceive, solve problems, and make decisions.",
            keyAspects: [
                "<strong>Mimicking Human Cognition:</strong> The primary goal is to simulate human thought processes, including learning (acquiring information and rules for using it), reasoning (using rules to reach approximate or definite conclusions), and self-correction.",
                "<strong>Problem Solving:</strong> AI systems are often designed to solve specific problems, from playing complex games like Chess or Go to optimizing logistics or diagnosing diseases.",
                "<strong>Perception:</strong> Enabling machines to interpret sensory input from the world, such as visual information (computer vision), sound (speech recognition), and touch.",
                "<strong>Adaptability:</strong> Modern AI strives for systems that can adapt to new situations and learn from new data without explicit reprogramming for every scenario."
            ],
            typesOfAI: [
                "<strong>Artificial Narrow Intelligence (ANI) or Weak AI:</strong> Specializes in one area and performs a specific task (e.g., virtual assistants, image recognition software). This is the current state of AI.",
                "<strong>Artificial General Intelligence (AGI) or Strong AI:</strong> AI that has the intellectual capability of a human being; it can understand, learn, and implement its knowledge across a wide range of tasks. This is still theoretical.",
                "<strong>Artificial Superintelligence (ASI):</strong> AI that surpasses human intelligence and ability across virtually every field. This is also theoretical and a subject of much debate."
            ],
            ethicalConsiderations: "As AI becomes more integrated into society, ethical considerations regarding bias, privacy, accountability, and the potential impact on employment become increasingly critical.",
            externalLinks: [
                { text: "Stanford Encyclopedia of Philosophy: Artificial Intelligence", url: "https://plato.stanford.edu/entries/artificial-intelligence/" },
                { text: "Association for the Advancement of Artificial Intelligence (AAAI)", url: "https://aaai.org/" }
            ]
        },
        ml: {
            title: "Machine Learning: Learning from Data",
            introduction: "Machine Learning (ML) is a prominent subfield of AI that focuses on developing algorithms allowing computer systems to learn from and make decisions or predictions based on data, without being explicitly programmed for each specific task. Instead of following hard-coded rules, ML models identify patterns in large datasets to improve their performance over time.",
            keyConcepts: [
                "<strong>Algorithms:</strong> The core of ML, these are mathematical procedures that process data to find patterns or make predictions (e.g., linear regression, decision trees, neural networks).",
                "<strong>Training Data:</strong> ML models are 'trained' using datasets. The quality and quantity of this data significantly impact the model's performance.",
                "<strong>Model:</strong> The output of the training process – a system that has learned to map inputs to outputs or identify structures within data.",
                "<strong>Features:</strong> Individual measurable properties or characteristics of the data being analyzed (e.g., pixels in an image, words in a text)."
            ],
            typesOfML: [
                "<strong>Supervised Learning:</strong> The model learns from labeled data (input-output pairs). Common tasks include classification (e.g., spam detection) and regression (e.g., predicting house prices).",
                "<strong>Unsupervised Learning:</strong> The model learns from unlabeled data, identifying patterns and structures on its own. Common tasks include clustering (e.g., customer segmentation) and dimensionality reduction.",
                "<strong>Reinforcement Learning:</strong> The model learns by interacting with an environment, receiving rewards or penalties for its actions, aiming to maximize cumulative reward (e.g., game playing, robotics)."
            ],
            applications: "Widely used in recommendation systems, image and speech recognition, fraud detection, medical diagnosis, financial forecasting, and autonomous vehicles.",
            externalLinks: [
                { text: "Google's Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
                { text: "Coursera: Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" }
            ]
        },
        dl: {
            title: "Deep Learning: Inspired by the Brain",
            introduction: "Deep Learning is a specialized branch of Machine Learning that utilizes artificial neural networks with multiple layers (hence 'deep') to learn complex patterns from vast amounts of data. These networks are inspired by the structure and function of the human brain, particularly its ability to process information hierarchically.",
            keyCharacteristics: [
                "<strong>Artificial Neural Networks (ANNs):</strong> Composed of interconnected nodes or 'neurons' organized in layers. Each connection has a weight that is adjusted during training.",
                "<strong>Hierarchical Feature Learning:</strong> Deep learning models can automatically learn relevant features from raw data at different levels of abstraction. For example, in image recognition, lower layers might learn edges, while higher layers learn more complex structures like faces.",
                "<strong>Large Datasets & Computational Power:</strong> Deep learning models typically require significant amounts of data and computational resources (often GPUs) for effective training.",
                "<strong>State-of-the-Art Performance:</strong> Has achieved breakthrough results in areas like computer vision, natural language processing (NLP), and speech recognition."
            ],
            commonArchitectures: [
                "<strong>Convolutional Neural Networks (CNNs):</strong> Highly effective for image and video processing.",
                "<strong>Recurrent Neural Networks (RNNs):</strong> Suited for sequential data like text and time series (e.g., LSTMs, GRUs).",
                "<strong>Transformers:</strong> Revolutionized NLP and are increasingly used in other domains (e.g., BERT, GPT models)."
            ],
            impact: "Driving advancements in self-driving cars, virtual assistants, machine translation, drug discovery, and generative AI (creating new content like images or text).",
            externalLinks: [
                { text: "DeepLearning.AI by Andrew Ng", url: "https://www.deeplearning.ai/" },
                { text: "MIT Deep Learning Book", url: "https://www.deeplearningbook.org/" }
            ]
        }
    };


    // --- Function to display AI concept details ---
    function displayAiConceptDetail(conceptKey) {
        const data = aiConceptDetailsData[conceptKey];
        if (!data || !aiConceptDetailContent) {
            if (aiConceptDetailContent) aiConceptDetailContent.innerHTML = "<p>Details not found for this AI concept.</p>";
            return;
        }

        let html = `<h3>${data.title}</h3>`;
        html += `<p class="section-intro">${data.introduction}</p>`;

        if (data.keyAspects || data.keyConcepts || data.keyCharacteristics) {
            const aspectsTitle = data.keyAspects ? "Key Aspects" : (data.keyConcepts ? "Key Concepts" : "Key Characteristics");
            const aspectsList = data.keyAspects || data.keyConcepts || data.keyCharacteristics;
            html += `<h4>${aspectsTitle}:</h4><ul>`;
            aspectsList.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        if (data.typesOfAI || data.typesOfML || data.commonArchitectures) {
            const typesTitle = data.typesOfAI ? "Main Types of AI" : (data.typesOfML ? "Common Types of Machine Learning" : "Common Deep Learning Architectures");
            const typesList = data.typesOfAI || data.typesOfML || data.commonArchitectures;
            html += `<h4>${typesTitle}:</h4><ul>`;
            typesList.forEach(item => html += `<li>${item}</li>`);
            html += `</ul>`;
        }
        if (data.applications) {
            html += `<h4>Common Applications:</h4><p>${data.applications}</p>`;
        }
        if (data.ethicalConsiderations) {
            html += `<h4>Ethical Considerations:</h4><p>${data.ethicalConsiderations}</p>`;
        }
         if (data.impact) {
            html += `<h4>Impact:</h4><p>${data.impact}</p>`;
        }
        if (data.externalLinks && data.externalLinks.length > 0) {
            html += `<h4>Further Reading:</h4><ul class="external-links-list">`;
            data.externalLinks.forEach(link => {
                html += `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> ${link.text}</a></li>`;
            });
            html += `</ul>`;
        }

        aiConceptDetailContent.innerHTML = html;

        if (aiConceptsGridContainer) aiConceptsGridContainer.classList.add('hidden');
        if (aiConceptDetailView) {
            aiConceptDetailView.style.display = 'block'; // Set display before triggering animation
            requestAnimationFrame(() => {
                aiConceptDetailView.classList.add('visible');
                aiConceptDetailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // Event listeners for clickable AI concepts
    if (clickableAiConcepts.length > 0) {
        clickableAiConcepts.forEach(item => {
            item.addEventListener('click', () => {
                const conceptKey = item.dataset.concept;
                if (conceptKey) displayAiConceptDetail(conceptKey);
            });
        });
    }

    // Event listener for back button in "What is AI?" section
    if (backToAiConceptsBtn && aiConceptDetailView && aiConceptsGridContainer) {
        backToAiConceptsBtn.addEventListener('click', () => {
            aiConceptDetailView.classList.remove('visible');
            setTimeout(() => {
                aiConceptDetailView.style.display = 'none';
                aiConceptsGridContainer.classList.remove('hidden');
                aiConceptsGridContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); // Match CSS transition duration
        });
    }


    // --- Data for Impact Details ---
    const impactDetailsData = {
        automation: {
            title: "AI in Automation: Reshaping Industries",
            introduction: "Artificial Intelligence is a pivotal force in automating complex tasks across various sectors, moving beyond simple robotic process automation (RPA) to cognitive automation that involves learning, reasoning, and self-correction. This transformation promises unprecedented efficiency but also brings societal considerations.",
            positive: [
                "<strong>Enhanced Efficiency & Productivity:</strong> AI systems operate 24/7 without fatigue, significantly increasing output, reducing operational costs, and optimizing resource allocation.",
                "<strong>Improved Accuracy & Quality:</strong> AI minimizes human error in repetitive tasks, leading to higher quality outcomes, especially in manufacturing, data processing, and quality control.",
                "<strong>Safer Work Environments:</strong> Robots and AI can handle hazardous, physically demanding, or monotonous tasks, reducing risks and improving well-being for human workers.",
                "<strong>New Service Possibilities & Personalization:</strong> Automation enables new business models and services like highly personalized recommendations, 24/7 AI-powered customer service, and autonomous systems in logistics and transportation."
            ],
            negative: [
                "<strong>Job Displacement & Skill Shifts:</strong> Automation of routine tasks can lead to job losses in certain sectors, necessitating significant workforce retraining, reskilling, and adaptation to new roles that complement AI.",
                "<strong>High Initial Investment & Complexity:</strong> Implementing sophisticated AI automation systems can be expensive and complex, posing a barrier for smaller businesses and requiring specialized expertise.",
                "<strong>Ethical Concerns & Algorithmic Bias:</strong> If AI decision-making in automation is based on biased data or flawed algorithms, it can perpetuate and even amplify existing societal inequalities.",
                "<strong>Over-Dependence & Security Risks:</strong> Increased reliance on automated systems can lead to vulnerabilities if these systems fail or are targeted by malicious actors."
            ],
            kenyaExamples: [
                "<strong>Agriculture (AgriTech):</strong> Startups like UjuziKilimo leverage AI and sensor data for automated soil analysis and precision farming advice, aiding smallholder farmers in optimizing crop management and yields.",
                "<strong>Financial Services (Fintech):</strong> Kenyan banks and fintech companies widely use AI-powered chatbots for customer service and sophisticated AI algorithms for credit scoring (e.g., M-Shwari, Tala), automating key aspects of loan origination and customer interaction.",
                "<strong>Manufacturing & Logistics:</strong> Some larger manufacturing plants are adopting robotic automation for assembly lines. In logistics, AI is used for route optimization and warehouse management to improve efficiency."
            ],
            externalLinks: [
                { text: "McKinsey: The Future of Automation", url: "https://www.mckinsey.com/capabilities/operations/our-insights/the-future-of-automation-capturing-value-from-the-next-wave-of-workforce-transformation" },
                { text: "World Economic Forum: Future of Jobs Report", url: "https://www.weforum.org/reports/the-future-of-jobs-report-2023/" }
            ]
        },
        jobmarket: { // Changed from jobcreation to jobmarket for broader scope
            title: "AI's Transformative Impact on the Job Market",
            introduction: "The influence of AI on the job market is complex and multifaceted, characterized by the displacement of some existing roles, the augmentation of others, and the creation of entirely new job categories that demand novel skill sets.",
            positive: [
                "<strong>Creation of New Roles:</strong> Significant demand is emerging for AI specialists, data scientists, machine learning engineers, AI ethicists, AI trainers, and AI system maintenance professionals.",
                "<strong>Augmentation & Enhancement of Existing Jobs:</strong> AI tools can assist professionals (e.g., doctors with AI-assisted diagnosis, lawyers with automated legal research), making their jobs more efficient, data-driven, and focused on higher-value strategic tasks.",
                "<strong>Economic Growth & New Industries:</strong> AI-driven innovation can spur the development of new products, services, and entirely new industries, thereby creating diverse employment opportunities.",
                "<strong>Increased Demand for Human-Centric Skills:</strong> As AI handles routine and analytical tasks, uniquely human skills like critical thinking, creativity, emotional intelligence, complex problem-solving, and interpersonal communication become even more valuable."
            ],
            negative: [
                "<strong>Skill Gaps & Structural Unemployment:</strong> The workforce may lack the necessary skills for new AI-related jobs, leading to structural unemployment or underemployment if reskilling efforts are insufficient or lag behind technological change.",
                "<strong>Wage Stagnation & Polarization:</strong> Automation may exert downward pressure on wages for easily automatable jobs, potentially leading to increased wage polarization between high-skill AI-complementary jobs and low-skill jobs.",
                "<strong>Increased Inequality:</strong> The economic benefits of AI might accrue disproportionately to capital owners and highly skilled workers, potentially widening income and wealth gaps if not addressed through policy.",
                "<strong>Transitional Challenges & Social Disruption:</strong> The period of adjustment as the job market shifts can be disruptive for individuals, communities, and entire industries, requiring robust social safety nets and proactive transition support."
            ],
            kenyaExamples: [
                "<strong>Tech Hubs & Startup Ecosystem:</strong> Nairobi's vibrant tech hubs (e.g., iHub, Nailab, Moringa School) are crucial in fostering AI startups and training talent, creating jobs for software engineers, data analysts, and AI product managers.",
                "<strong>Evolution of BPO Sector:</strong> While some basic BPO tasks face automation, there's growth in AI-assisted customer service roles that require handling more complex interactions and leveraging AI insights.",
                "<strong>Digital Skills Training Initiatives:</strong> Various government programs (like the Presidential Digital Talent Programme) and private sector initiatives in Kenya are focused on upskilling the youth in digital and AI-related competencies to meet emerging job demands."
            ],
            externalLinks: [
                { text: "Brookings Institution: AI and the Future of Work", url: "https://www.brookings.edu/research/ai-and-the-future-of-work-what-we-know-what-we-dont-and-what-we-need-to-figure-out/" },
                { text: "ILO: AI and the Future of Work - Global Report", url: "https://www.ilo.org/global/research/global-reports/weso/trends2023/WCMS_865032/lang--en/index.htm" }
            ]
        },
        // ... Add more detailed content for 'productivity', 'innovation', and 'ai-in-kenya'
        // using the same structure (title, introduction, positive, negative, kenyaExamples, externalLinks)
        // Make sure to fill these out thoroughly for a professional result.
        // For 'ai-in-kenya', the 'positive' and 'negative' can be reframed as 'Specific Applications & Growth Areas' and 'Challenges & Opportunities'
         productivity: {
            title: "AI's Amplification of Productivity",
            introduction: "AI technologies are significantly enhancing productivity across diverse industries by optimizing complex processes, enabling more accurate and timely decision-making, and empowering the human workforce with advanced analytical and automation tools.",
            positive: [
                "<strong>Process Optimization & Efficiency Gains:</strong> AI algorithms can analyze vast datasets to identify bottlenecks and inefficiencies, leading to optimized supply chains, streamlined manufacturing processes, and more efficient resource allocation.",
                "<strong>Data-Driven Decision-Making:</strong> AI-powered analytics provide deeper, actionable insights from complex data, enabling organizations to make more informed, faster, and evidence-based strategic and operational decisions.",
                "<strong>Personalization at Scale:</strong> AI can tailor products, services, educational content, and marketing messages to individual user needs and preferences, significantly increasing engagement, customer satisfaction, and conversion rates.",
                "<strong>Accelerated Research & Development:</strong> In fields like pharmaceuticals, material science, and engineering, AI speeds up discovery and innovation by analyzing complex experimental data, simulating outcomes, and identifying promising research avenues.",
                "<strong>Automation of Repetitive Tasks:</strong> Freeing up human workers from mundane, time-consuming tasks allows them to focus on more creative, strategic, and problem-solving activities, boosting overall job satisfaction and output quality."
            ],
            negative: [
                "<strong>Over-reliance & Potential Deskilling:</strong> Excessive reliance on AI for decision-making and task execution could lead to a decline in critical thinking and domain-specific skills among human workers if not balanced with continuous learning.",
                "<strong>Data Privacy & Security Imperatives:</strong> Productivity gains from AI often depend on access to large volumes of data, raising significant concerns about data privacy, security, and ethical data governance that must be proactively addressed.",
                "<strong>Integration & Implementation Challenges:</strong> Integrating AI solutions into existing legacy systems and established organizational workflows can be complex, costly, and time-consuming, requiring careful planning and change management.",
                "<strong>Measurement & Attribution Difficulties:</strong> Quantifying the precise productivity gains directly attributable to AI investments can be challenging, making ROI assessment and justification difficult for some organizations.",
                "<strong>Job Augmentation vs. Replacement Concerns:</strong> While AI can augment human capabilities, there are ongoing concerns that some productivity-enhancing AI tools might eventually lead to job reductions if not managed with a focus on human-machine collaboration."
            ],
            kenyaExamples: [
                "<strong>Logistics and E-commerce:</strong> Companies like Sendy and Jumia in Kenya utilize AI for dynamic route optimization, demand forecasting, and warehouse management, significantly improving delivery times, reducing fuel consumption, and enhancing overall operational productivity.",
                "<strong>Customer Relationship Management (CRM):</strong> Businesses across various sectors are adopting AI-enhanced CRM systems to automate lead scoring, personalize customer interactions, predict churn, and improve the productivity of sales and marketing teams.",
                "<strong>Content Creation & Digital Marketing:</strong> AI writing assistants and analytics tools are being used by marketers and content creators in Kenya to speed up the drafting of articles, social media posts, and marketing copy, and to optimize campaign performance.",
                "<strong>Agriculture:</strong> AI-driven platforms provide farmers with data-backed recommendations on planting times, fertilizer use, and pest control, leading to increased crop yields and more efficient use of resources."
            ],
            externalLinks: [
                { text: "Harvard Business Review: How AI is Changing Work", url: "https://hbr.org/2023/03/how-ai-is-changing-work" },
                { text: "Accenture: AI - Built to Scale Productivity", url: "https://www.accenture.com/us-en/insights/artificial-intelligence/ai-productivity" }
            ]
        },
        innovation: {
            title: "AI as a Catalyst for Unprecedented Innovation",
            introduction: "Artificial Intelligence is a fundamental driver of innovation, enabling transformative breakthroughs and paradigm shifts across nearly every field by providing new tools for discovery, creation, problem-solving, and the reimagining of existing processes.",
            positive: [
                "<strong>Development of Novel Products & Services:</strong> AI facilitates the creation of entirely new categories of products and services that were previously unimaginable, such as autonomous vehicles, sophisticated smart assistants, personalized medicine, and generative AI content tools.",
                "<strong>Accelerated Scientific Breakthroughs:</strong> AI significantly speeds up research in complex domains like genomics, drug discovery, climate modeling, and astrophysics by processing and finding hidden patterns in massive datasets far beyond human capacity.",
                "<strong>Enhanced Creativity & Design:</strong> AI tools are emerging that can generate art, music, architectural designs, and literary content, opening new avenues for human-AI collaboration and augmenting human creativity.",
                "<strong>Solving Complex Global Challenges:</strong> AI is being increasingly applied to tackle some of the world's most pressing issues, including climate change (e.g., optimizing renewable energy grids), disease outbreaks (e.g., predicting spread and developing vaccines), and sustainable resource management.",
                "<strong>Personalized Education and Healthcare:</strong> AI enables highly tailored learning experiences and personalized treatment plans, leading to more effective educational and healthcare outcomes for individuals."
            ],
            negative: [
                "<strong>Emergence of New Ethical Dilemmas:</strong> Rapid AI advancements continuously raise novel and complex ethical questions concerning issues like autonomous weapons systems, deepfakes and misinformation, algorithmic bias in novel applications, and the future of human agency.",
                "<strong>Intellectual Property & Authorship Challenges:</strong> Determining ownership, copyright, and fair use for AI-generated or AI-assisted creative works poses significant legal and philosophical challenges.",
                "<strong>Potential for Sophisticated Misuse:</strong> Powerful AI technologies, if ungoverned, could be misused for malicious purposes, including advanced cyberattacks, autonomous surveillance, and large-scale misinformation campaigns.",
                "<strong>The 'Black Box' Problem & Trust:</strong> The decision-making processes of some advanced AI models (especially deep learning) can be opaque and difficult to interpret, hindering trust, accountability, and the ability to debug errors in critical innovative applications.",
                "<strong>Exacerbating the Digital Divide:</strong> Access to AI technologies and the skills to leverage them for innovation may be unevenly distributed, potentially widening the gap between technologically advanced nations/groups and others."
            ],
            kenyaExamples: [
                "<strong>Healthcare Innovation:</strong> Kenyan health-tech startups are pioneering AI for remote diagnostics (e.g., analyzing X-rays for TB), predictive analytics for disease outbreaks, and optimizing maternal health outcomes, innovating healthcare delivery, especially in underserved and rural areas.",
                "<strong>Fintech & Financial Inclusion:</strong> Building on its mobile money leadership, Kenya's fintech sector uses AI to innovate in areas like alternative credit scoring for the unbanked, AI-driven fraud detection systems, and personalized financial advisory services through mobile platforms.",
                "<strong>Sustainable Agriculture & Climate Resilience:</strong> AI-powered platforms provide Kenyan farmers with localized weather forecasts, pest and disease alerts, and optimal irrigation schedules, fostering innovation in climate-smart agriculture.",
                "<strong>Smart City & Urban Development (Konza Technopolis):</strong> The vision for Konza Technopolis includes plans for AI-driven smart city solutions for intelligent traffic management, sustainable energy grids, efficient public services, and enhanced urban security, representing innovation in urban planning."
            ],
            externalLinks: [
                { text: "Stanford HAI (Human-Centered AI): AI Index Report", url: "https://aiindex.stanford.edu/" },
                { text: "Google AI: Advancing the State of the Art", url: "https://ai.google/discover/" }
            ]
        },
        'ai-in-kenya': {
            title: "Artificial Intelligence in Kenya: A Dynamic & Growing Landscape",
            introduction: "Kenya is rapidly emerging as a significant hub for AI innovation and adoption in Sub-Saharan Africa, propelled by a vibrant tech ecosystem, increasing digital connectivity, a youthful and tech-savvy population, and supportive government initiatives aimed at fostering a digital-first economy.",
            specificApplications: [
                "<strong>Financial Services (Fintech Dominance):</strong> Kenya's world-renowned mobile money platform (M-Pesa) provides a strong foundation. AI is extensively used for advanced credit scoring by numerous mobile lenders, sophisticated fraud detection and prevention, algorithmic trading, and delivering personalized banking experiences through AI-powered chatbots and robo-advisors.",
                "<strong>Agriculture (AgriTech Transformation):</strong> Startups and established companies deploy AI for precision farming, offering farmers crucial insights on soil health through sensor data, pest and disease detection via image analysis, crop yield predictions, and real-time market price information. Examples include UjuziKilimo, Twiga Foods (optimizing agricultural supply chains), and iProcure.",
                "<strong>Healthcare (HealthTech Advancements):</strong> AI applications are steadily growing in areas such as AI-assisted medical image analysis (e.g., for tuberculosis, cancer screening), virtual health assistants and symptom checkers, predictive analytics for disease outbreaks, and optimizing patient flow and resource allocation in hospitals. Telemedicine platforms are increasingly integrating AI for better triaging and remote consultations.",
                "<strong>Education (EdTech Personalization):</strong> AI-powered personalized learning platforms are being developed and piloted to cater to individual student learning paces and styles, aiming to improve educational outcomes and bridge learning gaps. Adaptive learning systems and AI tutors are key areas of interest and development.",
                "<strong>Retail & E-commerce Optimization:</strong> AI is used for sophisticated product recommendation engines, dynamic pricing, customer segmentation for targeted marketing, supply chain optimization, and fraud prevention for online retailers and e-commerce platforms operating in Kenya.",
                "<strong>Transportation & Logistics Efficiency:</strong> AI algorithms optimize routes for delivery services, ride-hailing platforms, and public transport systems. There's growing exploration of AI for intelligent traffic management systems in major urban centers like Nairobi to alleviate congestion.",
                "<strong>Natural Language Processing (NLP) for Local Languages:</strong> Efforts are underway to develop NLP models for Swahili and other local Kenyan languages, enabling more inclusive AI applications in customer service, information access, and content creation.",
                "<strong>Conservation and Environmental Monitoring:</strong> AI is being applied to analyze satellite imagery and sensor data for wildlife tracking, anti-poaching efforts, and monitoring deforestation and land degradation."
            ],
            challengesAndOpportunities: [
                "<strong>Opportunity: Leapfrogging Development:</strong> AI offers Kenya the potential to bypass traditional development stages by adopting cutting-edge solutions for societal challenges in health, education, and economic development.",
                "<strong>Challenge: Data Availability, Quality & Bias:</strong> Access to large, high-quality, and locally relevant datasets for training robust and unbiased AI models remains a significant hurdle. Ensuring data represents Kenya's diverse population is crucial.",
                "<strong>Challenge: Skills Gap & Talent Development:</strong> There's a pressing need for more skilled AI specialists, data scientists, machine learning engineers, and AI ethicists. Continued investment in education and training programs is essential.",
                "<strong>Challenge: Infrastructure Limitations:</strong> While improving, reliable and affordable internet connectivity, coupled with access to sufficient computational resources (cloud and on-premise), are vital for widespread AI development and deployment.",
                "<strong>Opportunity & Challenge: Ethical Frameworks & Regulation:</strong> Developing comprehensive ethical guidelines and a clear, agile regulatory framework for AI is critical to address issues of bias, privacy (Kenya's Data Protection Act 2019 is a start), accountability, and job displacement. This needs to foster innovation while mitigating risks.",
                "<strong>Opportunity: Investment & Funding Growth:</strong> Attracting both local and international investment for AI research, startups, and infrastructure development is key for sustaining the ecosystem's growth momentum.",
                "<strong>Opportunity: Public-Private Partnerships:</strong> Collaboration between government, academia, and the private sector is vital for creating a conducive environment for AI innovation, research, and responsible deployment."
            ],
            externalLinks: [
                { text: "Kenya National Digital Masterplan 2022-2032 (ICT Authority)", url: "https://www.ict.go.ke/kenya-national-digital-masterplan-2022-2032/" },
                { text: "AI Kenya Community", url: "https://aikenya.org/" },
                { text: "Strathmore University @iLabAfrica (AI Research & Incubation)", url: "https://ilabafrica.ac.ke/" },
                { text: "Mozilla Foundation: Common Voice (Swahili dataset initiative)", url: "https://commonvoice.mozilla.org/en/datasets" }
            ]
        }
    };


    // --- Function to display impact details ---
    function displayImpactDetail(impactKey) {
        const data = impactDetailsData[impactKey];
        if (!data || !impactDetailContent) {
            if(impactDetailContent) impactDetailContent.innerHTML = "<p>Details not found for this impact topic.</p>";
            return;
        }

        let html = `<h3>${data.title}</h3>`;
        html += `<p class="section-intro">${data.introduction}</p>`; // Use section-intro for consistent styling

        const generateList = (title, items, itemClassPrefix = "") => {
            if (items && items.length > 0) {
                html += `<h4>${title}</h4><ul>`;
                items.forEach(item => {
                    // Check if item is an object (for potential future structure) or string
                    const text = typeof item === 'object' ? item.text : item;
                    const className = typeof item === 'object' && item.type ? `${itemClassPrefix}${item.type}-label` : "";
                    html += `<li>${className ? `<span class="${className}">` : ''}${text}${className ? `</span>` : ''}</li>`;
                });
                html += `</ul>`;
            }
        };
        
        if (impactKey === 'ai-in-kenya') {
            generateList("Specific Applications & Growth Areas:", data.specificApplications);
            generateList("Challenges & Opportunities:", data.challengesAndOpportunities);
        } else {
            generateList("Positive Impacts:", data.positive, "positive-impact-"); // Prefix for specific styling if needed
            generateList("Negative Impacts & Challenges:", data.negative, "negative-impact-");
            generateList("Real-Life Examples in Kenya:", data.kenyaExamples);
        }

        if (data.externalLinks && data.externalLinks.length > 0) {
            html += `<h4>Further Reading:</h4><ul class="external-links-list">`;
            data.externalLinks.forEach(link => {
                html += `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> ${link.text}</a></li>`;
            });
            html += `</ul>`;
        }

        impactDetailContent.innerHTML = html;

        if (impactGridContainer) {
            impactGridContainer.classList.add('hidden');
            // Use a timeout to set display: none after animation, to prevent interference.
            // This is a bit of a hack; a more robust solution might involve 'transitionend' event.
            // setTimeout(() => {
            //     if (impactGridContainer.classList.contains('hidden')) {
            //         impactGridContainer.style.display = 'none';
            //     }
            // }, 500); // Match CSS transition duration
        }
        if (impactDetailView) {
            impactDetailView.style.display = 'block';
            requestAnimationFrame(() => {
                impactDetailView.classList.add('visible');
                impactDetailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // Event listeners for clickable impact items
    if (clickableImpacts.length > 0) {
        clickableImpacts.forEach(item => {
            item.addEventListener('click', () => {
                const impactKey = item.dataset.impact;
                if(impactKey) displayImpactDetail(impactKey);
            });
        });
    }

    // Event listener for back button in Impacts section
    if (backToImpactGridBtn && impactDetailView && impactGridContainer) {
        backToImpactGridBtn.addEventListener('click', () => {
            impactDetailView.classList.remove('visible');
            // impactGridContainer.style.display = 'grid'; // Or 'block' if it's not a grid directly

            setTimeout(() => {
                impactDetailView.style.display = 'none';
                impactGridContainer.classList.remove('hidden');
                impactGridContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); // Match transition duration
        });
    }


    // --- Contact Form (Simulation) ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput || !emailInput || !messageInput || !formStatus) {
                console.error("Contact form elements not found!");
                return;
            }
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let isValid = true;
            formStatus.innerHTML = ''; // Clear previous messages

            if (!name || !email || !message) {
                formStatus.innerHTML += '<p style="color: red;">Please fill in all fields.</p>';
                isValid = false;
            }
            if (email && (!email.includes('@') || !email.includes('.'))) {
                 formStatus.innerHTML += '<p style="color: red;">Please enter a valid email address.</p>';
                isValid = false;
            }

            if(isValid) {
                formStatus.textContent = 'Message sent successfully! (This is a simulation)';
                formStatus.style.color = 'var(--success-color)'; // Use CSS variable
                contactForm.reset();
                setTimeout(() => {
                    if (formStatus) formStatus.textContent = '';
                }, 5000);
            } else {
                 formStatus.style.color = 'var(--danger-color)';
            }
        });
    }
});