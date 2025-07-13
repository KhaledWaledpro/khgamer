 // تهيئة IndexedDB
        let db;
        const DB_NAME = 'GamesDB';
        const DB_VERSION = 1;
        const STORE_NAME = 'games';
        
        // فتح قاعدة البيانات
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = function(event) {
            console.error('فشل فتح قاعدة البيانات', event.target.error);
        };
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        
        request.onsuccess = function(event) {
            db = event.target.result;
            loadGames();
        };
        
        // تحميل الألعاب من IndexedDB
        function loadGames() {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            
            request.onerror = function(event) {
                console.error('فشل جلب الألعاب', event.target.error);
            };
            
            request.onsuccess = function(event) {
                const games = event.target.result;
                displayGames(games);
            };
        };
        
        // عرض الألعاب
        function displayGames(games) {
            const gamesList = document.getElementById('games-list');
            gamesList.innerHTML = '';
            
            if (!games || games.length === 0) {
                gamesList.innerHTML = '<p style="grid-column:1/-1; text-align:center;">لا توجد ألعاب متاحة حالياً</p>';
                return;
            }
            
            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.innerHTML = `
                    <img src="${game.thumbnail}" alt="${game.name}" class="game-thumbnail">
                    <div class="game-info">
                        <h3 class="game-title">${game.name}</h3>
                        <p class="game-desc">${game.desc}</p>
                        <span class="game-category">${game.category}</span>
                        <a href="${game.url}" target="_blank" class="play-btn">لعب الآن</a>
                    </div>
                `;
                gamesList.appendChild(gameCard);
            });
        }
