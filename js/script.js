
/*
let posts = [
    {
        'logo': './images/nasa.png',
        'name': 'Nasa',
        'image': './images/andromeda.jpg',
        'location': 'Polen',
        'isLiked': true,
        'likes': 7,
        'description': 'The Andromeda Galaxy, our nearest spiral neighbor, is about 2.537 million light-years away and will collide with the Milky Way in about 4.5 billion years.',
        'usernames': [],
        'comments': [],
        'date': '12 May 2024', 
    },

    {
        'logo': './images/instagram.png',
        'name': 'Instagram',
        'image': './images/moon.jpg',
        'location': 'Germany',
        'isLiked': true,
        'likes': 20,
        'description': 'The Moon, Earths natural satellite, orbits about 384,400 kilometers away. It influences our tides, and its phases have fascinated humans for centuries.',
        'usernames': [],
        'comments': [],
        'date': '12 December 2024',

    },

    {
        'logo': './images/facebook.png',
        'name': 'Facebook',
        'image': './images/javascript.jpg',
        'location': 'USA',
        'isLiked': true,
        'likes': 30,
        'description': 'JavaScript was invented by Brendan Eich in just 10 days.',
        'usernames': [],
        'comments': [],
        'date': '12.05.2024',

    },

];*/
/*load();
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        content.innerHTML += renderHTML(post, i);


        const commentsContent = document.getElementById(`commentsContent${i}`);
        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];
            const username = post['usernames'][j]; 
            commentsContent.innerHTML += `<div><strong>${username}:</strong> ${comment}</div>`;
        }
        Likes(i);
    }
    
}

function renderHTML(post, i) {
    return `
        <div class="card">
        <div class="main-card-headline">
        <div class="card-headline">
        <img src="${post['logo']}" alt="imgLogo" class="imgLogo"> 
        <h2>${post['name']}</h2>
        <p>${post['location']}</p>
        <div>${post['date']}</div>
        </div>
        </div>
        <div class="post-img"><img src="${post['image']}" alt="Obrazek" class="imgPost"></div>
        <div>
        <img src="./images/blackHeart.png" alt="" class="blackHeart" id="blackHeart${i}" onclick="toggleHeart(${i})">
        <img src="./images/sprechblase.png" alt="SprechblasenSymbol" class="sprachblasenSymbol">
        <img src="./images/senden.png" alt="sendenSymbol" class="sendenSymbol">
        <p class="likeCounter" id="likeCounter${i}">Likes ${posts[i]['likes']}</p>
        <div class="description" >${post['description']}</div>
        </div>
        <div class="wrapWord" id="commentsContent${i}"></div>
        <input id="nameInput${i}" placeholder="Dein Name">
        <input id="input${i}" placeholder="Kommentar"><button onclick="addComment(${i})">Comment</button>
        <button  onclick="deleteComment(${i})">Delete</button>
      </div>
    `;
    }

function addComment(i) {
    let input = document.getElementById(`input${i}`);
    let usernameInput = document.getElementById(`nameInput${i}`);
    posts[i]['comments'].push(input.value);
    posts[i]['usernames'].push(usernameInput.value);
    input.value = '';
    usernameInput.value = '';
    saveComments(); 
    render(); 
}

function deleteComment(i) {
    posts[i]['comments'].splice(0, 1);
    posts[i]['usernames'].splice(0, 1);
    saveComments(); 
    render();
}

//load();
//render();
// TU ZMIENILAM Z TRUE NA FALSE ZEBY NIE POKAZYWLAO SIE -1
function toggleHeart(i) {
    if (!posts[i]['isLiked']) {  // Dodanie polubienia
        document.getElementById(`blackHeart${i}`).src = './images/redHeart.png';
        posts[i]['isLiked'] = false; //TU ZMIENILAM NA FALSE
        posts[i]['likes']++;  // Zwiększamy liczbę polubień
    } else {  // Usunięcie polubienia
        document.getElementById(`blackHeart${i}`).src = './images/blackHeart.png';
        posts[i]['isLiked'] = true;//TU ZMIENILAM NA TRUE
        posts[i]['likes']--;  // Zmniejszamy liczbę polubień
    }

     // Wysyłanie zaktualizowanych danych o polubieniach do backendu
     //updatePostLikes(posts[i].id, posts[i]['isLiked'], posts[i]['likes']);


   
    Likes(i);  // Aktualizujemy wyświetlany licznik polubień
}





function Likes(i) {
    let likeCounter = document.getElementById(`likeCounter${i}`);
    let heart = document.getElementById(`blackHeart${i}`);
    if (posts[i]['isLiked']) {
        heart.src = './images/blackHeart.png';
    } else {
        heart.src = './images/redHeart.png';
    }
    likeCounter.innerHTML = `Likes ${posts[i]['likes']}`;
}

function saveComments() {
    let postsAddAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAddAsText)
}

function load() {
    let storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
}*/
////////////////////////////////////////////////////////////////////
//fetchData jest wywolywana body onlod w celu pokazania listy postow wraz z liks w niej sa zapisane pobrane posty i rendowane przy pomocy funkcj show
// Function to fetch posts from the server
/*
let posts = []; // Upewnij się, że zmienna posts jest globalna
let likedPosts = [];
let comments = [];

// Funkcja, która obsługuje kliknięcie ikony serca
function toggleHeart(i) {
    const postId = posts[i].id;
    // Logika na froncie może być bardziej elastyczna
    if (posts[i]['isLiked']) {
        posts[i]['likes_count']--; // Zmniejszamy licznik, jeśli był polubiony
    } else {
        posts[i]['likes_count']++; // Zwiększamy licznik, jeśli nie był polubiony
    }
    posts[i]['isLiked'] = !posts[i]['isLiked']; // Odwracamy stan
    Likes(i);  // Aktualizujemy wyświetlanie liczby lajków
    updatePostLikes(postId, posts[i]['isLiked']); // Wysyłamy dane do backendu
}


// Funkcja, która wysyła żądanie do backendu i aktualizuje interfejs po otrzymaniu odpowiedzi
function updatePostLikes(postId, isLiked, i) {
    fetch('http://127.0.0.1:8000/like-post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id: postId,
            user_id: 8  // Upewnij się, że ID użytkownika jest poprawne
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Aktualizujemy lokalny stan lajka po pomyślnym zapisie w backendzie
            posts[i]['isLiked'] = isLiked;
            posts[i]['likes_count'] = data.likes_count; // Zaktualizuj licznik lajków na podstawie odpowiedzi z serwera
            Likes(i);  // Aktualizujemy wyświetlanie liczby lajków
        } else {
            console.error('Błąd podczas aktualizacji lajka:', data.error);
        }
    })
    .catch(error => console.error('Błąd sieci:', error));
}




// Funkcja, która aktualizuje licznik lajków i ikonę serca
function Likes(i) {
    let likeCounter = document.getElementById(`likeCounter${i}`);
    let heart = document.getElementById(`blackHeart${i}`);
    if (posts[i]['isLiked']) {
        heart.src = './images/redHeart.png';
    } else {
        heart.src = './images/blackHeart.png';
    }
    likeCounter.innerHTML = `Likes ${posts[i]['likes_count']}`;
}


async function fetchPosts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/posts/');
        const data = await response.json();

        if (data.success) {
            // Aktualizacja globalnej zmiennej posts
            posts = data.posts;
            await getLikedPosts();  // Pobierz lajki po załadowaniu postów
            render(); // Wywołanie funkcji render po zaktualizowaniu 'posts'
        } else {
            console.error('Błąd: Brak postów w odpowiedzi', data.error);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}






function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];


  // Sprawdź, czy post jest polubiony przez użytkownika
  const likedPost = likedPosts.find(likedPost => likedPost.id === post.id);
  if (likedPost) {
      post.isLiked = likedPost.liked;
  }
  
        content.innerHTML += renderHTML(post, i);
    }

    for (let i = 0; i < posts.length; i++) {
        Likes(i);  // Upewniamy się, że ikony lajków są odpowiednio ustawione
    }

  
}

function renderHTML(post, i) {
  

    return `
       <div class="card">
            <div class="main-card-headline">
                <div class="card-headline">
                    <img src="${post.profile_image}" alt="User Logo" class="imgLogo"> 
                    <h2>${post.user}</h2>
                    <p>${post.location}</p>
                    <p>${post.created_at}</p>
                </div>
            </div>
            <div class="post-img">
                ${post.image ? `<img src="${post.image}" alt="Post Image" class="imgPost">` : ''}
            </div>
            <div>
                <img src="${post.isLiked ? './images/redHeart.png' : './images/blackHeart.png'}" alt="" class="blackHeart" id="blackHeart${i}" onclick="toggleHeart(${i})">
            
                <img src="./images/senden.png" alt="sendenSymbol" class="sendenSymbol">
                <img src="./images/sprechblase.png" alt="SprechblasenSymbol" class="sprachblasenSymbol">
                <p class="likeCounter" id="likeCounter${i}">Likes ${post.likes_count}</p>
                <div class="description" >${post.description}</div>
            </div>
            

 <input id="nameInput${i}" placeholder="Your Name">
            <input id="input${i}" placeholder="Add a comment...">
            <button onclick="addComment(${i})">Add Comment</button>
            <button onclick="deleteComment(${i})">Delete Comment</button>



        </div>
    `;
}






//////////////////////////////

async function getLikedPosts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/posts-like/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        if (data.posts) {
            data.posts.forEach(post => {
                likedPosts.push(post);  // Przechowujemy posty polubione przez użytkownika
            });
        } else {
            console.log("Błąd podczas pobierania lajków:", data.error);
        }
    } catch (error) {
        console.error("Błąd podczas pobierania lajków:", error);
    }
}




function addComment(i) {
    let input = document.getElementById(`input${i}`);
    let usernameInput = document.getElementById(`nameInput${i}`);
    const postId = posts[i].id;  // ID posta, do którego dodajemy komentarz
    const commentText = input.value.trim();
    const username = usernameInput.value.trim();

    if (commentText && username) {
        // Wysyłamy żądanie do backendu, aby dodać komentarz
        fetch('http://127.0.0.1:8000/submit-comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: postId,
                comment: commentText,
                user: username
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Dodajemy komentarz lokalnie, aby odświeżyć UI
                posts[i]['comments'].push(commentText);
                input.value = '';
                usernameInput.value = '';
                render();  // Aktualizujemy UI
            } else {
                console.error('Błąd podczas dodawania komentarza:', data.error);
            }
        })
        .catch(error => console.error('Błąd sieci:', error));
    }
}





function deleteComment(i) {
    const commentId = posts[i]['comments'][0].id;  // Załóżmy, że chcemy usunąć pierwszy komentarz

    fetch(`http://127.0.0.1:8000/delete-comment/${commentId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Usuwamy komentarz lokalnie, aby odświeżyć UI
            posts[i]['comments'].splice(0, 1);  // Usuwamy pierwszy komentarz
            render();  // Aktualizujemy UI
        } else {
            console.error('Błąd podczas usuwania komentarza:', data.error);
        }
    })
    .catch(error => console.error('Błąd sieci:', error));
}




*/


let posts = []; // Globalna zmienna na posty
let likedPosts = []; // Globalna zmienna na polubione posty

// Funkcja, która obsługuje kliknięcie ikony serca
function toggleHeart(i) {
    const postId = posts[i].id;
    if (posts[i]['isLiked']) {
        posts[i]['likes_count']--; // Zmniejszamy licznik, jeśli był polubiony
    } else {
        posts[i]['likes_count']++; // Zwiększamy licznik, jeśli nie był polubiony
    }
    posts[i]['isLiked'] = !posts[i]['isLiked']; // Odwracamy stan
    Likes(i);  // Aktualizujemy wyświetlanie liczby lajków
    updatePostLikes(postId, posts[i]['isLiked']); // Wysyłamy dane do backendu
}






// TRUDNIEJSZA WERSJA FUNKCJI UPADETPOSTLIKES Funkcja, która wysyła żądanie do backendu i aktualizuje interfejs po otrzymaniu odpowiedzi
/*function updatePostLikes(postId,  isLiked) {
    fetch('http://127.0.0.1:8000/like-post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id: postId,
            user_id: 10 // Upewnij się, że ID użytkownika jest poprawne
            //user_id: userId  // Dynamiczne ID użytkownika
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Aktualizujemy lokalny stan lajka po pomyślnym zapisie w backendzie
            posts.find(post => post.id === postId).likes_count = data.likes_count; // Aktualizuj licznik lajków na podstawie odpowiedzi z serwera
            render();  // Aktualizujemy UI
        } else {
            console.error('Błąd podczas aktualizacji lajka:', data.error);
        }
    })
    .catch(error => console.error('Błąd sieci:', error));
}
*/
//LATWA

async function updatePostLikes(postId, isLiked) {
    try {
        // Przygotowanie danych do wysłania
        const postData = {
            post_id: postId,
            user_id: 1 // Upewnij się, że ID użytkownika jest poprawne
            // user_id: userId  // Dynamiczne ID użytkownika
        };
        
        // Wysłanie żądania do serwera
        const response = await fetch('http://127.0.0.1:8000/like-post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        // Oczekiwanie na odpowiedź w formacie JSON
        const data = await response.json();

        // Sprawdzanie, czy operacja się powiodła
        if (data.success) {
            // Znalezienie posta po ID i aktualizacja liczby lajków
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id === postId) {
                    posts[i].likes_count = data.likes_count;
                    break;
                }
            }
            
            // Aktualizacja interfejsu użytkownika
            render();
        } else {
            console.error('Błąd podczas aktualizacji lajka:', data.error);
        }
    } catch (error) {
        // Obsługa błędu sieciowego
        console.error('Błąd sieci:', error);
    }
}




// Funkcja, która aktualizuje licznik lajków i ikonę serca
function Likes(i) {
    let likeCounter = document.getElementById(`likeCounter${i}`);
    let heart = document.getElementById(`blackHeart${i}`);
    if (posts[i]['isLiked']) {
        heart.src = './images/redHeart.png';
    } else {
        heart.src = './images/blackHeart.png';
    }
    likeCounter.innerHTML = `Likes ${posts[i]['likes_count']}`;
}

// Funkcja pobierająca posty
async function fetchPosts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/posts/');
        const data = await response.json();
        if (data.success) {
            posts = data.posts;
            await getLikedPosts();  // Pobierz lajki po załadowaniu postów
            render(); // Wywołanie funkcji render po zaktualizowaniu 'posts'
        } else {
            console.error('Błąd: Brak postów w odpowiedzi', data.error);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// TRUDNIEJSZA WERSJA Funkcja, która pobiera lajki użytkownika
/*
async function getLikedPosts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/posts-like/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.posts) {
            likedPosts = data.posts;
            likedPosts.forEach(likedPost => {
                let post = posts.find(post => post.id === likedPost.id);
                if (post) {
                    post.isLiked = likedPost.liked;
                }
            });
            render();  // Aktualizacja UI po załadowaniu polubionych postów
        } else {
            console.log("Błąd podczas pobierania lajków:", data.error);
        }
    } catch (error) {
        console.error("Błąd podczas pobierania lajków:", error);
    }
}*/
//LATWA
async function getLikedPosts() {
    try { 
        // Wysłanie żądania do serwera
        const response = await fetch('http://127.0.0.1:8000/posts-like', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Oczekiwanie na odpowiedź w formacie JSON
        const data = await response.json();

        // Sprawdzenie, czy dane zostały poprawnie pobrane
        if (data.posts) {
            likedPosts = data.posts;

            // Przechodzenie przez pobrane polubione posty za pomocą pętli for
            for (let i = 0; i < likedPosts.length; i++) {
                let likedPost = likedPosts[i];

                // Znalezienie odpowiedniego posta w lokalnej liście 'posts'
                for (let j = 0; j < posts.length; j++) {
                    if (posts[j].id === likedPost.id) {
                        posts[j].isLiked = likedPost.liked;
                        break; // Kończymy pętlę wewnętrzną, gdy znajdziemy odpowiedni post
                    }
                }
            }

            // Aktualizacja interfejsu użytkownika po załadowaniu polubionych postów
            render();
        } else {
            console.log("Błąd podczas pobierania lajków:", data.error);
        }
    } catch (error) {
        console.error("Błąd podczas pobierania lajków:", error);
    }
}



// Funkcja renderująca posty
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        content.innerHTML += renderHTML(post, i);
    }
    for (let i = 0; i < posts.length; i++) {
        Likes(i);  // Upewniamy się, że ikony lajków są odpowiednio ustawione
    }
}
/*
// TRUDNA Funkcja generująca HTML dla postu
function renderHTML(post, i) {
    let commentsHTML = '';
    post.comments.forEach(comment => {
        commentsHTML += `
            <div class="comment">
                <span><b>${comment.user}:</b> ${comment.content}</span>
                <button class="belka" onclick="deleteComment(${i}, ${comment.id})">Delete Comment</button>
            </div>
        `;
    });

    return `
        <div class="card">
            <div class="main-card-headline">
                <div class="card-headline">
                    <img src="${post.profile_image}" alt="User Logo" class="imgLogo"> 
                    <h2>${post.user}</h2>
                    <p>${post.location}</p>
                    <p>${post.created_at}</p>
                </div>
            </div>
            <div class="post-img">
                ${post.image ? `<img src="${post.image}" alt="Post Image" class="imgPost">` : ''}
            </div>
            <div>
                <img src="${post.isLiked ? './images/redHeart.png' : './images/blackHeart.png'}" alt="" class="blackHeart" id="blackHeart${i}" onclick="toggleHeart(${i})">
                <img src="./images/senden.png" alt="sendenSymbol" class="sendenSymbol">
                <img src="./images/sprechblase.png" alt="SprechblasenSymbol" class="sprachblasenSymbol">
                <p class="likeCounter" id="likeCounter${i}">Likes ${post.likes_count}</p>
                <div class="description" >${post.description}</div>
            </div>

            ${commentsHTML}

            <input id="nameInput${i}" placeholder="Your Name">
            <input id="input${i}" placeholder="Add a comment...">
            <button onclick="addComment(${i})">Add Comment</button>
        </div>
    `;
}

*/
//LATWA 
// Funkcja generująca HTML dla postu
function renderHTML(post, i) {
    let commentsHTML = '';

    // Użycie pętli for do generowania HTML dla komentarzy
    for (let j = 0; j < post.comments.length; j++) {
        let comment = post.comments[j];
        commentsHTML += `
            <div class="comment">
                <span><b>${comment.user}:</b> ${comment.content}</span>
                <button class="belka" onclick="deleteComment(${i}, ${comment.id})">Delete Comment</button>
            </div>
        `;
    }

    return `
        <div class="card">
            <div class="main-card-headline">
                <div class="card-headline">
                    <img src="${post.profile_image}" alt="User Logo" class="imgLogo"> 
                    <h2>${post.user}</h2>
                    <p>${post.location}</p>
                    <p>${post.created_at}</p>
                </div>
            </div>
            <div class="post-img">
                ${post.image ? `<img src="${post.image}" alt="Post Image" class="imgPost">` : ''}
            </div>
            <div>
                <img src="${post.isLiked ? './images/redHeart.png' : './images/blackHeart.png'}" alt="" class="blackHeart" id="blackHeart${i}" onclick="toggleHeart(${i})">
                <img src="./images/senden.png" alt="sendenSymbol" class="sendenSymbol">
                <img src="./images/sprechblase.png" alt="SprechblasenSymbol" class="sprachblasenSymbol">
                <p class="likeCounter" id="likeCounter${i}">Likes ${post.likes_count}</p>
                <div class="description" >${post.description}</div>
            </div>

            ${commentsHTML}

            <input id="nameInput${i}" placeholder="Your Name">
            <input id="input${i}" placeholder="Add a comment...">
            <button onclick="addComment(${i})">Add Comment</button>
        </div>
    `;
}
//TRUNDE
// Funkcja dodająca komentarz
/*function addComment(i) {
    let input = document.getElementById(`input${i}`);
    let usernameInput = document.getElementById(`nameInput${i}`);
    const postId = posts[i].id;
    const commentText = input.value.trim();
    const username = usernameInput.value.trim();

    if (commentText && username) {
        // Wysyłamy żądanie do backendu, aby dodać komentarz
        fetch('http://127.0.0.1:8000/submit-comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: postId,
                comment: commentText,
                user: username
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (!posts[i]['comments']) {
                    posts[i]['comments'] = [];  // Inicjujemy pustą listę, jeśli nie istnieje
                }
                posts[i]['comments'].push({ id: data.comment_id, user: username, content: commentText });
                input.value = '';
                usernameInput.value = '';
                render();  // Aktualizujemy UI
            } else {
                console.error('Błąd podczas dodawania komentarza:', data.error);
            }
        })
        .catch(error => console.error('Błąd sieci:', error));
    }
}*/


//LATEWE
// Funkcja dodająca komentarz
async function addComment(i) {
    let input = document.getElementById(`input${i}`);
    let usernameInput = document.getElementById(`nameInput${i}`);
    const postId = posts[i].id;
    const commentText = input.value.trim();
    const username = usernameInput.value.trim();

    if (commentText && username) {
        try {
            // Wysyłamy żądanie do backendu, aby dodać komentarz
            const response = await fetch('http://127.0.0.1:8000/submit-comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: postId,
                    comment: commentText,
                    user: username
                })
            });

            // Oczekiwanie na odpowiedź serwera w formacie JSON
            const data = await response.json();

            // Sprawdzenie, czy dodanie komentarza się powiodło
            if (data.success) {
                // Jeśli lista komentarzy nie istnieje, tworzymy ją
                if (!posts[i].comments) {
                    posts[i].comments = [];
                }

                // Dodanie nowego komentarza do listy komentarzy
                posts[i].comments.push({
                    id: data.comment_id,
                    user: username,
                    content: commentText
                });

                // Czyszczenie pól po dodaniu komentarza
                input.value = '';
                usernameInput.value = '';

                // Aktualizacja interfejsu użytkownika
                render();
            } else {
                console.error('Błąd podczas dodawania komentarza:', data.error);
            }
        } catch (error) {
            console.error('Błąd sieci:', error);
        }
    }
}

//TRUDNA
// Funkcja usuwająca komentarz
/*function deleteComment(postIndex, commentId) {
    fetch(`http://127.0.0.1:8000/delete-comment/${commentId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Usuwamy komentarz lokalnie, aby odświeżyć UI
            posts[postIndex]['comments'] = posts[postIndex]['comments'].filter(comment => comment.id !== commentId);
            render();  // Aktualizujemy UI
        } else {
            console.error('Błąd podczas usuwania komentarza:', data.error);
        }
    })
    .catch(error => console.error('Błąd sieci:', error));
}
*/


//LATWE

// Funkcja usuwająca komentarz
async function deleteComment(postIndex, commentId) {
    try {
        // Wysłanie żądania do backendu, aby usunąć komentarz
        const response = await fetch(`http://127.0.0.1:8000/delete-comment/${commentId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Oczekiwanie na odpowiedź serwera w formacie JSON
        const data = await response.json();

        // Sprawdzenie, czy usunięcie komentarza się powiodło
        if (data.success) {
            // Tworzymy nową tablicę do przechowywania zaktualizowanej listy komentarzy
            let updatedComments = [];

            // Przechodzimy przez wszystkie komentarze postu
            for (let j = 0; j < posts[postIndex].comments.length; j++) {
                let comment = posts[postIndex].comments[j];

                // Dodajemy komentarz do nowej listy, jeśli jego ID nie jest równe usuwanemu komentarzowi
                if (comment.id !== commentId) {
                    updatedComments.push(comment);
                }
            }

            // Aktualizujemy listę komentarzy dla danego postu
            posts[postIndex].comments = updatedComments;

            // Aktualizujemy interfejs użytkownika
            render();
        } else {
            console.error('Błąd podczas usuwania komentarza:', data.error);
        }
    } catch (error) {
        console.error('Błąd sieci:', error);
    }
}





// Uruchamiamy początkowe pobranie postów
fetchPosts();
