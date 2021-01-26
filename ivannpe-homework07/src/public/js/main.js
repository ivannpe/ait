// TODO: add client side code for single page application
const req = new XMLHttpRequest();

function updateTable(){
    const reviews = JSON.parse(req.responseText);

    const table = document.querySelector('tbody');
    const table2 = document.querySelector('tbody');
        

    for(let i = 0; i < reviews.length; i++){
        const row = document.createElement('tr');
        //name
        const name = document.createElement('td');
        name.textContent = reviews[i].name;
        row.appendChild(name);
        //semester
        const semester = document.createElement('td');
        semester.textContent = reviews[i].semester;
        row.appendChild(semester);
        //year
        const year = document.createElement('td');
        year.textContent = reviews[i].year;
        row.appendChild(year);
        //review
        const review = document.createElement('td');
        review.textContent = reviews[i].review;
        row.appendChild(review);

        //update table
        table2.appendChild(row);
    }
    //use those review objects to replace the contents of the table on the page 
    //(for example, you could remove all the children in tbody using 
    // parentElement.removeChild(childElementToRemove)
    table.parentNode.replaceChild(table2, table);
    
}
function main() {

    // const url = "/api/reviews"
    // // const req = new XMLHttpRequest();
    // req.open('GET', url, true);

    //filter
    const filter = document.querySelector('#filterBtn');
    filter.addEventListener('click', function(evt){
        evt.preventDefault();
        let semesterVal = document.querySelector('#filterSemester').value;
        let yearVal = document.querySelector('#filterYear').value;
        if(semesterVal === ""){
            let semesterVal = "";
        }else if(yearVal === ""){
            let yearVal = "";
        }
        const queryUrl = `/api/reviews?semester=${semesterVal}&year=${yearVal}`;
        req.open('GET', queryUrl, true);
        

        //loading table
        req.addEventListener('load', updateTable);
        
        req.send();
    });

    //add
    const add = document.querySelector('#addBtn');
    add.addEventListener('click', function(evt){
        evt.preventDefault();
        const nameVal = document.querySelector('#name').value;
        const semesterVal = document.querySelector('#semester').value;
        const yearVal = document.querySelector('#year').value;
        const reviewVal = document.querySelector('#review').value;


        //post 
        req.open('POST', '/api/review/create');
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //loading table
        req.addEventListener('load', function(){
            updateTable();
            //if there was a filter set before adding, then clear the filter to show all reviews, including the newly added one
            document.querySelector('#filterSemester').value = "";
            document.querySelector('#filterYear').value = "";

            // console.log(reviews);
            // const url = "/api/reviews"
            // // const req = new XMLHttpRequest();
            // req.open('GET', url, true);
            // req.send();
            
        });

        req.send(`name=${nameVal}&semester=${semesterVal}&year=${yearVal}&review=${reviewVal}`);

    });
    
    // const url = "/api/reviews"
    // // const req = new XMLHttpRequest();
    // req.open('GET', url, true);
    req.send();


}

document.addEventListener("DOMContentLoaded", main);
