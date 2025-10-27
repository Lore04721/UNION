// Script legacy concatenato generato automaticamente
(function(global){
  // Punto di ingresso opzionale: chiamato da HomeComponent dopo il render
  global.legacyInit = function(){
    try {
      // Se gli script originali si aspettavano DOM pronto, inserisci qui il bootstrap
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ /* TODO: init */ });
      } else {
        /* TODO: init immediato */
      }
    } catch(e){ console.error('legacyInit error', e); }
  };
  global.legacyDestroy = function(){
    // TODO: rimuovi event listener/timer se ne hai aggiunti
  };
})(window);


// ---- Contenuto originale (concatenato) ----

        // Variabili globali
        let currentStep = 1;
        let selectedOptions = {};
        let isRecording = false;
        let recordingTimer = null;
        let recordingTime = 0;
        let selectedRole = 'student';
        let selectedBullyingType = '';
        let isMobileMenuOpen = false;

        // Inizializzazione
        document.addEventListener('DOMContentLoaded', function () {
            // Inizializzazioni esistenti
            window.addEventListener('scroll', function () {
                const header = document.getElementById('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                animateOnScroll();
            });

            // Nuove inizializzazioni
            initMobileMenu();
            updateBackButton();
            initFormValidation();

            // Animazione iniziale
            animateOnScroll();
            animateCharts();

            // Mostra homepage all'avvio
            backToHome();
            
            // Assicurati che i modali siano chiusi all'avvio
            closeAuthModal();
        });

        // Inizializzazione Menu Hamburger
        function initMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const backButton = document.querySelector('.back-button');

            if (hamburger) {
                hamburger.addEventListener('click', toggleMobileMenu);
            }

            // Mostra/nascondi pulsante indietro
            if (backButton) {
                backButton.style.display = window.history.length > 1 ? 'block' : 'none';
            }

            // Chiudi menu al click fuori
            document.addEventListener('click', (e) => {
                if (isMobileMenuOpen &&
                    !e.target.closest('.nav-menu') &&
                    !e.target.closest('.hamburger')) {
                    closeMobileMenu();
                }
            });

            // Chiudi con ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        }

        function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            isMobileMenuOpen = !isMobileMenuOpen;
            hamburger.setAttribute('aria-expanded', isMobileMenuOpen);
            navMenu.classList.toggle('active');

            // Trap focus nel menu quando aperto
            if (isMobileMenuOpen) {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        }

        function closeMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            isMobileMenuOpen = false;
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }

        // Animazione sezioni al scroll
        function animateOnScroll() {
            const sections = document.querySelectorAll('.section-header, .stat-card, .chart-3d-container');

            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop < windowHeight * 0.85) {
                    section.classList.add('visible');

                    if (section.classList.contains('chart-3d-container')) {
                        section.classList.add('animated');
                    }
                }
            });
        }

        // Animazione grafici
        function animateCharts() {
            const bars = document.querySelectorAll('.bar-3d');
            const pie = document.querySelector('.pie-chart-3d');
            const line = document.querySelector('.line-chart-3d');

            setTimeout(() => {
                bars.forEach(bar => {
                    bar.classList.add('animated');
                });

                if (pie) pie.classList.add('animated');
                if (line) line.classList.add('animated');
            }, 1000);
        }

        // Navigazione tra pagine
        function backToHome() {
            hideAllPages();
            document.getElementById('homepage').style.display = 'block';
            window.scrollTo(0, 0);
            updateBackButton();
        }

        function showTeacherLogin() {
            hideAllPages();
            document.getElementById('teacher-dashboard').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        function showStudentLogin() {
            hideAllPages();
            document.getElementById('student-dashboard').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        // NEW: Parent Dashboard Functions
        function showParentLogin() {
            hideAllPages();
            document.getElementById('parent-dashboard').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        function selectChild(element, childId) {
            document.querySelectorAll('#children-list .subject-item').forEach(item => {
                item.classList.remove('active');
            });
            element.classList.add('active');
            // Qui potremmo caricare i dati del figlio selezionato
            document.getElementById('child-name').textContent = element.textContent;
            // In un'app reale, qui faremmo una chiamata per aggiornare i progressi
        }

        function showGenericLogin() {
            hideAllPages();
            document.getElementById('generic-dashboard').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        // NEW: Bullying Page Functions
        function showBullyingPage(event) {
            if (event) event.preventDefault();
            hideAllPages();
            document.getElementById('bullying-page').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        function selectBullyingType(type) {
            selectedBullyingType = type;
            document.querySelectorAll('.bullying-option-card').forEach(card => {
                card.style.borderColor = 'transparent';
            });
            event.target.closest('.bullying-option-card').style.borderColor = 'var(--primary)';

            document.getElementById('bullying-form').style.display = 'block';
            let title = '';
            if (type === 'victim') {
                title = 'Sei una vittima di bullismo';
            } else if (type === 'witness') {
                title = 'Hai assistito a un episodio di bullismo';
            } else if (type === 'bully') {
                title = 'Vuoi cambiare il tuo comportamento';
            }
            document.getElementById('bullying-form-title').textContent = title;
        }

        function submitBullyingReport() {
            // Qui in una app reale invieremmo i dati al server
            document.getElementById('bullying-form').style.display = 'none';
            document.getElementById('bullying-thanks').style.display = 'block';
        }

        // NEW: Contact Page Functions
        function showContactPage(event) {
            if (event) event.preventDefault();
            hideAllPages();
            document.getElementById('contact-page').classList.add('active');
            window.scrollTo(0, 0);
            updateBackButton();
        }

        function submitContactForm() {
            // Qui in una app reale invieremmo i dati al server
            document.querySelector('.contact-form').style.display = 'none';
            document.getElementById('contact-thanks').style.display = 'block';
        }

        // NEW: Teacher Contact Modal Functions
        function openContactTeacherModal() {
            document.getElementById('contactTeacherModal').classList.add('active');
        }

        function closeContactTeacherModal() {
            document.getElementById('contactTeacherModal').classList.remove('active');
        }

        function sendMessageToTeacher() {
            const teacher = document.getElementById('teacher-select').value;
            const subject = document.getElementById('teacher-subject').value;
            const message = document.getElementById('teacher-message').value;

            if (!subject || !message) {
                alert('Per favore, inserisci oggetto e messaggio.');
                return;
            }

            alert('Messaggio inviato al docente!');
            closeContactTeacherModal();
        }

        // NEW: Privacy Security Page Function
        function showPrivacySecurityPage(event) {
            if (event) event.preventDefault();
            alert('Pagina Privacy e Sicurezza Dati - In sviluppo');
        }

        function hideAllPages() {
            document.getElementById('homepage').style.display = 'none';
            document.querySelectorAll('.dashboard').forEach(d => d.classList.remove('active'));
        }

        // Gestione materie studenti
        function selectSubject(element, subject) {
            document.querySelectorAll('.subject-item').forEach(item => {
                item.classList.remove('active');
            });
            element.classList.add('active');
            // In un'app reale, qui caricheremmo i materiali della materia selezionata
        }

        // Gestione classi docenti
        function selectClass(element, classId) {
            document.querySelectorAll('.class-card').forEach(card => {
                card.classList.remove('active');
            });
            element.classList.add('active');
            // In un'app reale, qui caricheremmo i materiali della classe selezionata
        }

        // Gestione tab docenti
        function switchTeacherTab(tabName) {
            // Nascondi tutti i tab
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // Rimuovi active da tutti i tab nav
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Mostra il tab selezionato
            document.getElementById('teacher-' + tabName).classList.add('active');

            // Attiva il tab nav corrispondente
            event.target.classList.add('active');
        }

        // Apertura demo
        function openDemo(demoType) {
            const modal = document.getElementById('demoModal');
            const title = document.getElementById('demoTitle');
            const description = document.getElementById('demoDescription');
            const content = document.getElementById('demoContent');

            // Imposta titolo e descrizione in base al tipo di demo
            switch (demoType) {
                case 'mindmap':
                    title.textContent = '🗺️ Generatore Mappe Concettuali';
                    description.textContent = 'Crea mappe concettuali automaticamente da qualsiasi testo';
                    content.innerHTML = `
                        <div style="text-align: center; padding: 2rem 0;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🗺️</div>
                            <h3>Incolla il testo da trasformare in mappa concettuale</h3>
                            <textarea class="form-control" rows="6" placeholder="Incolla qui il tuo testo..."></textarea>
                            <div class="demo-actions">
                                <button class="demo-btn demo-btn-primary" onclick="generateMindMap()">Genera Mappa</button>
                            </div>
                            <div id="mindmapResult" style="margin-top: 2rem; display: none;">
                                <h4>La tua mappa concettuale:</h4>
                                <div style="background: var(--light); padding: 2rem; border-radius: 15px; margin-top: 1rem;">
                                    <div style="text-align: left;">
                                        <div style="font-weight: bold; color: var(--primary);">Concetto Principale</div>
                                        <div style="margin-left: 1rem; margin-top: 0.5rem;">
                                            <div>• Concetto Secondario 1</div>
                                            <div style="margin-left: 1rem;">- Dettaglio 1</div>
                                            <div style="margin-left: 1rem;">- Dettaglio 2</div>
                                            <div>• Concetto Secondario 2</div>
                                            <div style="margin-left: 1rem;">- Dettaglio 1</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="demo-actions">
                                    <button class="demo-btn demo-btn-primary">Scarica Mappa</button>
                                    <button class="demo-btn demo-btn-primary">Condividi</button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;

                case 'summary':
                    title.textContent = '📝 Generatore Riassunti';
                    description.textContent = 'Crea riassunti efficaci automaticamente con AI';
                    content.innerHTML = `
                        <div style="text-align: center; padding: 2rem 0;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">📝</div>
                            <h3>Incolla il testo da riassumere</h3>
                            <textarea class="form-control" rows="6" placeholder="Incolla qui il testo da riassumere..."></textarea>
                            <div class="demo-actions">
                                <button class="demo-btn demo-btn-primary" onclick="generateSummary()">Genera Riassunto</button>
                            </div>
                            <div id="summaryResult" style="margin-top: 2rem; display: none;">
                                <h4>Il tuo riassunto:</h4>
                                <div style="background: var(--light); padding: 2rem; border-radius: 15px; margin-top: 1rem; text-align: left;">
                                    <p>Questo è un riassunto generato automaticamente dall'AI. I concetti principali sono stati estratti e organizzati in modo chiaro e conciso.</p>
                                    <p>Il sistema ha identificato i punti chiave e li ha presentati in una struttura logica e facile da comprendere.</p>
                                </div>
                                <div class="demo-actions">
                                    <button class="demo-btn demo-btn-primary">Scarica Riassunto</button>
                                    <button class="demo-btn demo-btn-primary">Condividi</button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;

                case 'quiz':
                    title.textContent = '🎯 Generatore Quiz';
                    description.textContent = 'Crea quiz personalizzati per testare le conoscenze';
                    content.innerHTML = `
                        <div style="text-align: center; padding: 2rem 0;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🎯</div>
                            <h3>Inserisci l'argomento per il quiz</h3>
                            <input type="text" class="form-control" placeholder="Es. Equazioni di secondo grado, Seconda Guerra Mondiale..." style="margin-bottom: 1rem;">
                            <div class="demo-actions">
                                <button class="demo-btn demo-btn-primary" onclick="generateQuiz()">Genera Quiz</button>
                            </div>
                            <div id="quizResult" style="margin-top: 2rem; display: none;">
                                <h4>Il tuo quiz:</h4>
                                <div style="background: var(--light); padding: 2rem; border-radius: 15px; margin-top: 1rem; text-align: left;">
                                    <div style="margin-bottom: 1.5rem;">
                                        <h5>1. Qual è la formula risolutiva per le equazioni di secondo grado?</h5>
                                        <div style="margin-left: 1rem;">
                                            <div><input type="radio" name="q1"> x = -b ± √(b² - 4ac) / 2a</div>
                                            <div><input type="radio" name="q1"> x = b ± √(b² - 4ac) / 2a</div>
                                            <div><input type="radio" name="q1"> x = -b ± √(b² + 4ac) / 2a</div>
                                        </div>
                                    </div>
                                    <div style="margin-bottom: 1.5rem;">
                                        <h5>2. Cosa rappresenta il discriminante in un'equazione di secondo grado?</h5>
                                        <div style="margin-left: 1rem;">
                                            <div><input type="radio" name="q2"> Il numero di soluzioni reali</div>
                                            <div><input type="radio" name="q2"> Il valore della x</div>
                                            <div><input type="radio" name="q2"> Il coefficiente di x²</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="demo-actions">
                                    <button class="demo-btn demo-btn-primary">Verifica Risposte</button>
                                    <button class="demo-btn demo-btn-primary">Scarica Quiz</button>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }

            modal.classList.add('active');
        }

        // Chiudi demo
        function closeDemo() {
            document.getElementById('demoModal').classList.remove('active');
        }

        // Funzioni demo
        function generateMindMap() {
            document.getElementById('mindmapResult').style.display = 'block';
        }

        function generateSummary() {
            document.getElementById('summaryResult').style.display = 'block';
        }

        function generateQuiz() {
            document.getElementById('quizResult').style.display = 'block';
        }

        // Apertura registrazione avanzata
        function openEnhancedRecording(userType) {
            document.getElementById('enhancedRecordingModal').classList.add('active');
        }

        // Chiudi registrazione avanzata
        function closeEnhancedRecording() {
            document.getElementById('enhancedRecordingModal').classList.remove('active');
            stopRecording();
        }

        // Gestione registrazione
        function toggleRecording() {
            if (!isRecording) {
                startRecording();
            } else {
                pauseRecording();
            }
        }

        function startRecording() {
            const recordButton = document.getElementById('recordButton');
            const stopButton = document.getElementById('stopButton');
            const resumeButton = document.getElementById('resumeButton');
            const waveform = document.getElementById('waveform');

            isRecording = true;
            recordButton.classList.add('recording');
            stopButton.disabled = false;
            resumeButton.disabled = true;
            waveform.classList.add('active');

            // Simula il timer di registrazione
            recordingTime = 0;
            recordingTimer = setInterval(() => {
                recordingTime++;
                const minutes = Math.floor(recordingTime / 60);
                const seconds = recordingTime % 60;
                recordButton.innerHTML = `⏹️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        function pauseRecording() {
            const recordButton = document.getElementById('recordButton');
            const stopButton = document.getElementById('stopButton');
            const resumeButton = document.getElementById('resumeButton');
            const waveform = document.getElementById('waveform');

            isRecording = false;
            recordButton.classList.remove('recording');
            recordButton.innerHTML = '🎤';
            stopButton.disabled = false;
            resumeButton.disabled = false;
            waveform.classList.remove('active');

            clearInterval(recordingTimer);
        }

        function stopRecording() {
            const recordButton = document.getElementById('recordButton');
            const stopButton = document.getElementById('stopButton');
            const resumeButton = document.getElementById('resumeButton');
            const waveform = document.getElementById('waveform');

            isRecording = false;
            recordButton.classList.remove('recording');
            recordButton.innerHTML = '🎤';
            stopButton.disabled = true;
            resumeButton.disabled = true;
            waveform.classList.remove('active');

            clearInterval(recordingTimer);
            recordingTime = 0;
        }

        function resumeRecording() {
            startRecording();
        }

        function saveRecording() {
            alert('Registrazione salvata con successo!');
        }

        function transcribeRecording() {
            const transcriptionArea = document.getElementById('transcriptionArea');
            const transcriptionText = document.getElementById('transcriptionText');

            transcriptionArea.classList.add('active');
            transcriptionText.innerHTML = 'Trascrizione in corso... <span class="typing-cursor"></span>';

            // Simula il processo di trascrizione
            setTimeout(() => {
                transcriptionText.innerHTML = `
                    "Buongiorno a tutti, oggi parleremo delle equazioni di secondo grado. 
                    Le equazioni di secondo grado sono espressioni matematiche della forma 
                    ax² + bx + c = 0, dove a, b e c sono coefficienti numerici."
                    <span class="typing-cursor"></span>
                `;
            }, 2000);
        }

        function generateSummaryFromAudio() {
            alert('Riassunto generato dalla registrazione audio!');
        }

        // Gestione sondaggio - Validazione Avanzata
        function selectOption(element, value) {
            // Rimuovi selected da tutte le opzioni
            const options = element.parentElement.querySelectorAll('.survey-option');
            options.forEach(option => {
                option.classList.remove('selected');
            });

            // Aggiungi selected all'opzione cliccata
            element.classList.add('selected');

            // Salva la risposta
            selectedOptions[`step${currentStep}`] = value;
        }

        function nextStep(step) {
            const currentStepElem = document.getElementById(`step${currentStep}`);
            const requiresTextarea = currentStepElem.hasAttribute('data-requires');
            const textarea = currentStepElem.querySelector('textarea');
            const hasRadioOptions = currentStepElem.querySelector('.survey-option');

            let canProceed = false;

            if (requiresTextarea && textarea) {
                // Per step con textarea, basta che sia compilata
                canProceed = textarea.value.trim().length > 0;
            } else if (hasRadioOptions) {
                // Per step con radio, controlla selezione O textarea se presente
                const selectedOption = selectedOptions[`step${currentStep}`];
                const additionalText = textarea ? textarea.value.trim() : '';
                canProceed = selectedOption || additionalText.length > 0;
            } else {
                canProceed = true;
            }

            if (!canProceed) {
                showValidationError(currentStepElem, 'Per favore, compila almeno un campo prima di procedere.');
                return;
            }

            hideAllSteps();
            document.getElementById(`step${step}`).classList.add('active');
            currentStep = step;
            updateProgress();
        }

        function showValidationError(element, message) {
            // Rimuovi errori precedenti
            const existingError = element.querySelector('.validation-error');
            if (existingError) existingError.remove();

            // Crea nuovo messaggio di errore
            const errorElem = document.createElement('div');
            errorElem.className = 'validation-error';
            errorElem.style.cssText = 'color: var(--danger); margin-top: 1rem; font-size: 0.9rem;';
            errorElem.textContent = message;
            errorElem.setAttribute('role', 'alert');

            element.appendChild(errorElem);

            // Focus sul primo campo
            const firstInput = element.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
                firstInput.setAttribute('aria-invalid', 'true');
            }
        }

        function prevStep(step) {
            // Nascondi il passo corrente
            document.getElementById(`step${currentStep}`).classList.remove('active');

            // Mostra il passo precedente
            document.getElementById(`step${step}`).classList.add('active');

            // Aggiorna il progresso
            currentStep = step;
            updateProgress();
        }

        function updateProgress() {
            const progressBar = document.getElementById('surveyProgress');
            const progressText = document.getElementById('progressText');

            const progress = (currentStep / 6) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${currentStep}/6`;
        }

        function hideAllSteps() {
            document.querySelectorAll('.survey-step').forEach(step => {
                step.classList.remove('active');
            });
        }

        function submitSurvey() {
            // Nascondi il modulo del sondaggio
            document.getElementById(`step${currentStep}`).classList.remove('active');

            // Mostra i risultati
            document.getElementById('surveyResults').classList.add('active');

            // In un'app reale, qui invieremmo i dati al server
            console.log('Risposte del sondaggio:', selectedOptions);
        }

        // Gestione ricerca per docenti
        function openResearch(topic) {
            const resultsContainer = document.getElementById('researchResults');

            let content = '';

            switch (topic) {
                case 'matematica':
                    content = `
                        <h3>Risorse per Matematica Avanzata</h3>
                        <div class="research-item">
                            <div class="research-title">Insegnare la Risoluzione dei Problemi Matematici</div>
                            <div class="research-source">Fonte: Rivista Internazionale di Didattica della Matematica</div>
                            <div class="research-snippet">Strategie evidence-based per aiutare gli studenti a sviluppare competenze nella risoluzione di problemi matematici complessi attraverso l'approccio per scoperta.</div>
                        </div>
                        <div class="research-item">
                            <div class="research-title">L'Utilizzo della Realtà Aumentata nell'Insegnamento della Geometria</div>
                            <div class="research-source">Fonte: Conferenza Internazionale su Tecnologia e Educazione</div>
                            <div class="research-snippet">Come integrare strumenti di realtà aumentata per visualizzare concetti geometrici tridimensionali e migliorare la comprensione spaziale degli studenti.</div>
                        </div>
                    `;
                    break;

                case 'scienze':
                    content = `
                        <h3>Risorse per Scienze Sperimentali</h3>
                        <div class="research-item">
                            <div class="research-title">Laboratori Virtuali per l'Insegnamento delle Scienze</div>
                            <div class="research-source">Fonte: Journal of Science Education</div>
                            <div class="research-snippet">Implementazione di laboratori virtuali per simulare esperimenti scientifici quando le risorse fisiche sono limitate, mantenendo alto l'engagement degli studenti.</div>
                        </div>
                        <div class="research-item">
                            <div class="research-title">L'Insegnamento della Sostenibilità attraverso Progetti Pratici</div>
                            <div class="research-source">Fonte: UNESCO Education Resources</div>
                            <div class="research-snippet">Progetti interdisciplinari che coinvolgono gli studenti in attività pratiche legate alla sostenibilità ambientale, sviluppando competenze trasversali.</div>
                        </div>
                    `;
                    break;

                case 'metodologie':
                    content = `
                        <h3>Nuove Metodologie Didattiche</h3>
                        <div class="research-item">
                            <div class="research-title">L'Apprendimento Basato su Progetti (PBL) nel XXI Secolo</div>
                            <div class="research-source">Fonte: International Journal of Educational Research</div>
                            <div class="research-snippet">Come implementare efficacemente l'apprendimento basato su progetti per sviluppare competenze del XXI secolo come collaborazione, pensiero critico e creatività.</div>
                        </div>
                        <div class="research-item">
                            <div class="research-title">La Classe Capovolta: Evidenze e Best Practice</div>
                            <div class="research-source">Fonte: Flipped Learning Global Initiative</div>
                            <div class="research-snippet">Analisi dell'efficacia del modello di classe capovolta in diversi contesti educativi e strategie per implementarlo con successo.</div>
                        </div>
                    `;
                    break;
            }

            resultsContainer.innerHTML = content;
        }

        // Gestione cartelle utente generico
        function openFolder(folderName) {
            alert(`Apertura cartella: ${folderName}`);
            // In un'app reale, qui navigheremmo al contenuto della cartella
        }

        function createNewFolder() {
            const folderName = prompt('Inserisci il nome della nuova cartella:');
            if (folderName) {
                alert(`Cartella "${folderName}" creata con successo!`);
                // In un'app reale, qui creeremmo la cartella nel backend
            }
        }

        // Gestione autenticazione - FUNZIONI CORRETTE
        function showAuthModal(type) {
            const authModal = document.getElementById('authModal');
            authModal.classList.add('active');
            
            if (type === 'login') {
                switchAuthTab('login');
            } else {
                switchAuthTab('register');
                // Mostra il form di registrazione per il ruolo predefinito (studente)
                showRegistrationForm('student');
            }
            
            // Previeni il comportamento default
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        function closeAuthModal() {
            const authModal = document.getElementById('authModal');
            authModal.classList.remove('active');
        }

        function switchAuthTab(tab) {
            // Gestione tab attivi
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(tab + 'Tab').classList.add('active');

            // Gestione form attivi
            document.querySelectorAll('#loginForm, #registerForm').forEach(f => f.classList.remove('active'));
            
            if (tab === 'login') {
                document.getElementById('loginForm').classList.add('active');
                document.getElementById('registerForm').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
            } else {
                document.getElementById('registerForm').classList.add('active');
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('registerForm').style.display = 'block';
            }
        }

        function selectRole(role) {
            selectedRole = role;

            // Rimuovi selected da tutte le card
            document.querySelectorAll('.role-card').forEach(card => {
                card.classList.remove('selected');
            });

            // Aggiungi selected alla card cliccata
            event.currentTarget.classList.add('selected');

            // Mostra il form di registrazione appropriato
            showRegistrationForm(role);
        }

        function showRegistrationForm(role) {
            // Nascondi tutti i form di registrazione
            document.querySelectorAll('#registerForm .form-step').forEach(form => {
                form.style.display = 'none';
            });

            // Mostra il form appropriato
            const targetForm = document.getElementById(role + 'Registration');
            if (targetForm) {
                targetForm.style.display = 'block';
                targetForm.classList.add('active');
            }
        }

        // Validazione Form
        function initFormValidation() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', handleFormSubmit);

                // Validazione real-time
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', validateField);
                    input.addEventListener('input', clearFieldError);
                });
            });
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const form = e.target;

            if (validateForm(form)) {
                // Procedi con l'invio
                if (form.id === 'loginForm') {
                    performLogin();
                } else if (form.id.includes('Registration')) {
                    const role = form.id.replace('Registration', '');
                    performRegistration(role);
                }
            }
        }

        function validateForm(form) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!validateField({ target: field })) {
                    isValid = false;
                }
            });

            return isValid;
        }

        function validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            let isValid = true;

            // Rimuovi stato errore precedente
            field.setAttribute('aria-invalid', 'false');
            const errorElem = field.parentNode.querySelector('.field-error');
            if (errorElem) errorElem.remove();

            // Validazioni specifiche
            if (field.required && !value) {
                showFieldError(field, 'Questo campo è obbligatorio');
                isValid = false;
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Inserisci un indirizzo email valido');
                    isValid = false;
                }
            } else if (field.type === 'password' && value) {
                if (value.length < 6) {
                    showFieldError(field, 'La password deve essere di almeno 6 caratteri');
                    isValid = false;
                }
            } else if (field.id && field.id.includes('ConfirmPassword')) {
                const passwordField = document.getElementById(field.id.replace('Confirm', ''));
                if (passwordField && passwordField.value !== value) {
                    showFieldError(field, 'Le password non coincidono');
                    isValid = false;
                }
            }

            return isValid;
        }

        function showFieldError(field, message) {
            field.setAttribute('aria-invalid', 'true');

            const errorElem = document.createElement('span');
            errorElem.className = 'field-error';
            errorElem.style.cssText = 'color: var(--danger); font-size: 0.8rem; display: block; margin-top: 0.5rem;';
            errorElem.textContent = message;
            errorElem.setAttribute('role', 'alert');

            field.parentNode.appendChild(errorElem);
        }

        function clearFieldError(e) {
            const field = e.target;
            field.setAttribute('aria-invalid', 'false');

            const errorElem = field.parentNode.querySelector('.field-error');
            if (errorElem) errorElem.remove();
        }

        function performLogin() {
            // In un'app reale, qui gestiremmo il login
            alert('Login effettuato con successo!');
            closeAuthModal();

            // Reindirizza alla dashboard appropriata in base al ruolo
            // Per demo, reindirizziamo alla dashboard studente
            showStudentLogin();
        }

        function performRegistration(role) {
            // In a real application, this would send registration data to a server
            alert(`Registrazione ${role} completata con successo!`);
            closeAuthModal();

            // Show appropriate dashboard based on role
            if (role === 'teacher') {
                showTeacherLogin();
            } else if (role === 'student') {
                showStudentLogin();
            } else if (role === 'parent') {
                showParentLogin();
            } else {
                showGenericLogin();
            }
        }

        // Gestione autorizzazioni
        function grantMicrophoneAccess() {
            document.getElementById('authorizationPopup').classList.remove('active');
            // In un'app reale, qui gestiremmo l'accesso al microfono
        }

        function closeAuthorizationPopup() {
            document.getElementById('authorizationPopup').classList.remove('active');
        }

        // Back Universale
        function goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback alla home se non c'è history
                backToHome();
            }
        }

        function updateBackButton() {
            const backButton = document.querySelector('.back-button');
            if (backButton) {
                const shouldShow = !document.getElementById('homepage').style.display !== 'none' &&
                    window.history.length > 1;
                backButton.style.display = shouldShow ? 'block' : 'none';
            }
        }

        // Gestione pagine legali (placeholder)
        function showPrivacyPage(event) {
            if (event) event.preventDefault();
            alert('Pagina Privacy Policy - Questa è una demo, la pagina reale sarebbe qui.');
        }

        function showCookiePage(event) {
            if (event) event.preventDefault();
            alert('Pagina Cookie Policy - Questa è una demo, la pagina reale sarebbe qui.');
        }

        // Setup per chiudere modale cliccando fuori
        document.addEventListener('DOMContentLoaded', function() {
            const authModal = document.getElementById('authModal');
            
            // Chiudi modale cliccando fuori dal contenuto
            authModal.addEventListener('click', function(e) {
                if (e.target === authModal) {
                    closeAuthModal();
                }
            });
            
            // Chiudi modale con ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && authModal.classList.contains('active')) {
                    closeAuthModal();
                }
            });
        });
    