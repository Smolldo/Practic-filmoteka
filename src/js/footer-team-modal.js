const  openTeamBtn = document.querySelector('.devs__btn');
const closeTeamBtn = document.querySelector('.close-team__btn');
const modal = document.querySelector('.team__backdrop');

openTeamBtn.addEventListener('click', OpenTeam = () =>{
    modal.classList.toggle('team__animate');
})

closeTeamBtn.addEventListener('click', CloseTeam = () =>{
    modal.classList.toggle('team__animate');
})