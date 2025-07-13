 // نظام إدارة الألعاب
        document.addEventListener('DOMContentLoaded', function() {
            loadGames();
        });
        
        // تحميل الألعاب من التخزين المحلي
        function loadGames() {
            const games = JSON.parse(localStorage.getItem('games')) || [];
            const gamesList = document.getElementById('games-list');
            gamesList.innerHTML = '';
            
            if (games.length === 0) {
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