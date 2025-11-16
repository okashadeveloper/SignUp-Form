var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var mainBox = document.getElementById('mainBox');

var signUpForm = document.getElementById('signUpForm');
var signInForm = document.getElementById('signInForm');
var clearDataButton = document.getElementById('clearData');
var removeUserButton = document.getElementById('removeUser');



//yaha agar aap button dabao gay tu class add ho jay gi aur swap ho jay ga 
signUpButton.addEventListener('click', function() {
    mainBox.classList.add("slider-active");
});

signInButton.addEventListener('click', function() {
    mainBox.classList.remove("slider-active");
});




//ye local storage ka code hay jaha hum user ka data store kar rahay hain
var localStorage = 'userDatabase';

function getUserDatabase() {
    var data = localStorage.getItem(localStorage);
    return data ? JSON.parse(data) : [];
}

function saveUserDatabase(db) {
    localStorage.setItem(localStorage, JSON.stringify(db));
}




signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('signUpUsername').value;
    var email = document.getElementById('signUpEmail').value;
    var password = document.getElementById('signUpPassword').value;

    if (!username || !email || !password) {
        Swal.fire({ icon: 'error', title: 'Error!', text: 'Fill all fields', background: '#333', color: '#fff' });
        return;
    }



        var userDB = getUserDatabase();
        var existingUser = null;
        for (var i = 0; i < userDB.length; i++) {
            if (userDB[i].email === email) {
                existingUser = userDB[i];
                break;
            }
        }



    if (existingUser) {
        Swal.fire({ icon: 'warning', title: 'Oops!', text: 'Email already registered', background: '#333', color: '#fff' });
        return;
    }

    userDB.push({ username: username, email: email, password: password });
    saveUserDatabase(userDB);

    Swal.fire({ icon: 'success', title: 'Success!', text: 'Sign Up Successful', background: '#333', color: '#fff' })
        .then(function() {
            mainBox.classList.remove("slider-active");
            signUpForm.reset();
        });
});





signInForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = document.getElementById('signInEmail').value;
    var password = document.getElementById('signInPassword').value;

    var userDB = getUserDatabase();
    var user = null;
    for (var i = 0; i < userDB.length; i++) {
        if (userDB[i].email === email && userDB[i].password === password) {
            user = userDB[i];
            break;
        }
    }

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'Welcome, ' + user.username + '!',
            text: 'You are signed in.',
            background: '#333',
            color: '#fff'
        }).then(function() {
            signInForm.reset();
           
            window.location.href = "https://nextedge-company.vercel.app/"; 
        });
    } else {
        Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Invalid email or password', background: '#333', color: '#fff' });
    }
});




clearDataButton.addEventListener('click', function() {
    Swal.fire({
        title: 'Are you sure?',
        text: "All user data will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008000',
        background: '#333',
        color: '#fff'
    }).then(function(result) {
        if (result.isConfirmed) {
            localStorage.removeItem(localStorage);
            Swal.fire({ icon: 'info', title: 'Cleared!', background: '#333', color: '#fff' });
        }
    });
});





// bahee ye wala kaam sweet alert ka hay 
removeUserButton.addEventListener('click', function() {
    Swal.fire({
        title: 'Enter Email',
        input: 'email',
        inputPlaceholder: 'user@example.com',
        showCancelButton: true,
        confirmButtonColor: '#008000',
        background: '#333',
        color: '#fff'
    }).then(function(result) {
        if (result.isConfirmed && result.value) {
            var emailToRemove = result.value;

            var userDB = getUserDatabase();
            var initialLength = userDB.length;
            var newDB = [];
            for (var i = 0; i < userDB.length; i++) {
                if (userDB[i].email !== emailToRemove) {
                    newDB.push(userDB[i]);
                }
            }

            if (newDB.length < initialLength) {
                saveUserDatabase(newDB);
                Swal.fire({ icon: 'success', title: 'User Removed', background: '#333', color: '#fff' });
            } else {
                Swal.fire({ icon: 'error', title: 'Not Found', background: '#333', color: '#fff' });
            }
        }
    });
});
