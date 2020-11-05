// IIFE - Immediatly invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");
        console.log("Scripts being called");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event) =>{
                if (!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/movie-list');                        
                }
            })
        }
    }

    window.addEventListener("load", Start);

})();