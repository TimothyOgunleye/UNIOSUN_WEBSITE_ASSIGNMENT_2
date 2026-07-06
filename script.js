/**************************************************************************
 * Osun State University, Osogbo, Nigeria
 * POST-UTME APPLICATION PORTAL
 * File: script.js
 *
 * PART 3A
 * Dynamic O'Level Result Management
 **************************************************************************/


/*********************************************************************
                SUBJECTS OFFERED IN WAEC/NECO
*********************************************************************/

const subjects = [

"English Language",

"Mathematics",

"Biology",

"Agricultural Science",

"Physics",

"Chemistry",

"Economics",

"Commerce",

"Financial Accounting",

"Government",

"Civic Education",

"Literature in English",

"Geography",

"History",

"CRS",

"IRS",

"Further Mathematics",

"Computer Studies",

"Data Processing",

"Technical Drawing",

"Visual Arts",

"Music",

"French",

"Yoruba",

"Igbo",

"Hausa"

];


/*********************************************************************
                    AVAILABLE GRADES
*********************************************************************/

const grades = [

"A1",

"B2",

"B3",

"C4",

"C5",

"C6",

"D7",

"E8",

"F9"

];


/*********************************************************************
                PAGE INITIALIZATION
*********************************************************************/

window.onload = function(){

    // Automatically create five O'Level rows
    for(let i = 0; i < 5; i++){

        addRow();

    }

};


/*********************************************************************
                    ADD NEW RESULT ROW
*********************************************************************/

function addRow(){

    const tbody = document.getElementById("tableBody");

    const row = document.createElement("tr");


    /*************************
            SUBJECT
    *************************/

    const subjectCell = document.createElement("td");

    const subjectSelect = document.createElement("select");

    subjectSelect.required = true;

    let subjectOptions = "<option value=''>Select Subject</option>";

    subjects.forEach(function(subject){

        subjectOptions += `<option>${subject}</option>`;

    });

    subjectSelect.innerHTML = subjectOptions;

    subjectCell.appendChild(subjectSelect);


    /*************************
            GRADE
    *************************/

    const gradeCell = document.createElement("td");

    const gradeSelect = document.createElement("select");

    gradeSelect.required = true;

    let gradeOptions = "<option value=''>Grade</option>";

    grades.forEach(function(grade){

        gradeOptions += `<option>${grade}</option>`;

    });

    gradeSelect.innerHTML = gradeOptions;

    gradeCell.appendChild(gradeSelect);


    /*************************
            DELETE BUTTON
    *************************/

    const actionCell = document.createElement("td");

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "deleteButton";

    deleteButton.innerHTML = "Delete";

    deleteButton.onclick = function(){

        deleteRow(this);

    };

    actionCell.appendChild(deleteButton);


    /*************************
        APPEND CELLS
    *************************/

    row.appendChild(subjectCell);

    row.appendChild(gradeCell);

    row.appendChild(actionCell);

    tbody.appendChild(row);

}


/*********************************************************************
                DELETE RESULT ROW
*********************************************************************/

function deleteRow(button){

    const tbody = document.getElementById("tableBody");

    if(tbody.rows.length > 1){

        button.parentElement.parentElement.remove();

    }

    else{

        alert("At least one O'Level subject must remain.");

    }

}


/*********************************************************************
            GET ALL O'LEVEL RESULTS
*********************************************************************/

function getResults(){

    const rows = document.querySelectorAll("#tableBody tr");

    let results = [];

    rows.forEach(function(row){

        const subject = row.cells[0].querySelector("select").value;

        const grade = row.cells[1].querySelector("select").value;

        if(subject !== "" && grade !== ""){

            results.push({

                subject: subject,

                grade: grade

            });

        }

    });

    return results;

}


/*********************************************************************
            DISPLAY RESULTS IN CONSOLE
    (Useful During Development)
*********************************************************************/

function displayResults(){

    console.clear();

    console.table(getResults());

}


/**************************************************************************
 * PART 3B
 * Form Validation and Data Collection
 **************************************************************************/


/*********************************************************************
                APPLICATION FORM
*********************************************************************/

const applicationForm = document.getElementById("applicationForm");


/*********************************************************************
        FORM SUBMISSION
*********************************************************************/

applicationForm.addEventListener("submit", function(event){

    event.preventDefault();

    if(validateForm()){

        alert("Application Submitted Successfully!");

        generatePreview();

    }

});


/*********************************************************************
            VALIDATE FORM
*********************************************************************/

function validateForm(){

    if(document.getElementById("utmeReg").value.trim() === ""){

        alert("Please enter your UTME Registration Number.");

        return false;

    }


    if(document.getElementById("fullname").value.trim() === ""){

        alert("Please enter your Full Name.");

        return false;

    }


    if(document.getElementById("gender").value === ""){

        alert("Please select Gender.");

        return false;

    }


    if(document.getElementById("phone").value.trim() === ""){

        alert("Please enter Phone Number.");

        return false;

    }


    if(document.getElementById("address").value.trim() === ""){

        alert("Please enter Home Address.");

        return false;

    }


    if(document.getElementById("state").value === ""){

        alert("Please select State.");

        return false;

    }


    if(document.getElementById("lga").value.trim() === ""){

        alert("Please enter Local Government.");

        return false;

    }


    if(document.getElementById("nokName").value.trim() === ""){

        alert("Enter Next of Kin Name.");

        return false;

    }


    if(document.getElementById("relationship").value === ""){

        alert("Select Relationship.");

        return false;

    }


    if(document.getElementById("nokPhone").value.trim() === ""){

        alert("Enter Next of Kin Phone Number.");

        return false;

    }


    if(document.getElementById("nokAddress").value.trim() === ""){

        alert("Enter Next of Kin Address.");

        return false;

    }


    if(document.getElementById("utmeScore").value === ""){

        alert("Enter UTME Score.");

        return false;

    }


    if(document.getElementById("course").value === ""){

        alert("Select Course.");

        return false;

    }


    const results = getResults();

    if(results.length < 5){

        alert("Enter at least FIVE O'Level Subjects.");

        return false;

    }

    return true;

}


/*********************************************************************
                GET BIODATA
*********************************************************************/

function getBiodata(){

    return{

        utmeReg:

        document.getElementById("utmeReg").value,

        fullname:

        document.getElementById("fullname").value,

        gender:

        document.getElementById("gender").value,

        phone:

        document.getElementById("phone").value,

        address:

        document.getElementById("address").value,

        state:

        document.getElementById("state").value,

        lga:

        document.getElementById("lga").value

    };

}


/*********************************************************************
                NEXT OF KIN
*********************************************************************/

function getNextOfKin(){

    return{

        name:

        document.getElementById("nokName").value,

        relationship:

        document.getElementById("relationship").value,

        phone:

        document.getElementById("nokPhone").value,

        address:

        document.getElementById("nokAddress").value

    };

}


/*********************************************************************
            ACADEMIC RECORD
*********************************************************************/

function getAcademicRecord(){

    return{

        score:

        document.getElementById("utmeScore").value,

        course:

        document.getElementById("course").value,

        sittings:

        document.getElementById("sittings").value

    };

}


/*********************************************************************
            COLLECT ENTIRE APPLICATION
*********************************************************************/

function collectApplication(){

    return{

        biodata:

        getBiodata(),

        nextOfKin:

        getNextOfKin(),

        academic:

        getAcademicRecord(),

        olevel:

        getResults()

    };

}


/*********************************************************************
        DISPLAY OBJECT IN CONSOLE
*********************************************************************/

function showApplication(){

    console.clear();

    console.log(collectApplication());

}

/**************************************************************************
 * PART 3C
 * Print Preview and Printing
 **************************************************************************/


/*********************************************************************
            GENERATE PRINT PREVIEW
*********************************************************************/

function generatePreview(){

    const application = collectApplication();

    const preview = document.getElementById("previewContent");

    let html = "";


    /*********************************************************
                    BIODATA
    *********************************************************/

    html += `
    <h2>SECTION A: BIODATA INFORMATION</h2>

    <table class="previewTable">

        <tr>
            <th>Item</th>
            <th>Information</th>
        </tr>

        <tr>
            <td>UTME Registration Number</td>
            <td>${application.biodata.utmeReg}</td>
        </tr>

        <tr>
            <td>Full Name</td>
            <td>${application.biodata.fullname}</td>
        </tr>

        <tr>
            <td>Gender</td>
            <td>${application.biodata.gender}</td>
        </tr>

        <tr>
            <td>Phone Number</td>
            <td>${application.biodata.phone}</td>
        </tr>

        <tr>
            <td>Home Address</td>
            <td>${application.biodata.address}</td>
        </tr>

        <tr>
            <td>State</td>
            <td>${application.biodata.state}</td>
        </tr>

        <tr>
            <td>Local Government</td>
            <td>${application.biodata.lga}</td>
        </tr>

    </table>
    `;


    /*********************************************************
                    NEXT OF KIN
    *********************************************************/

    html += `
    <br>

    <h2>SECTION B: NEXT OF KIN INFORMATION</h2>

    <table class="previewTable">

        <tr>
            <th>Item</th>
            <th>Information</th>
        </tr>

        <tr>
            <td>Name</td>
            <td>${application.nextOfKin.name}</td>
        </tr>

        <tr>
            <td>Relationship</td>
            <td>${application.nextOfKin.relationship}</td>
        </tr>

        <tr>
            <td>Phone Number</td>
            <td>${application.nextOfKin.phone}</td>
        </tr>

        <tr>
            <td>Address</td>
            <td>${application.nextOfKin.address}</td>
        </tr>

    </table>
    `;


    /*********************************************************
                ACADEMIC RECORD
    *********************************************************/

    html += `
    <br>

    <h2>SECTION C: ACADEMIC RECORD</h2>

    <table class="previewTable">

        <tr>
            <th>Item</th>
            <th>Information</th>
        </tr>

        <tr>
            <td>UTME Score</td>
            <td>${application.academic.score}</td>
        </tr>

        <tr>
            <td>Course Applied For</td>
            <td>${application.academic.course}</td>
        </tr>

        <tr>
            <td>Number of Sittings</td>
            <td>${application.academic.sittings}</td>
        </tr>

    </table>
    `;


    /*********************************************************
                    O'LEVEL RESULTS
    *********************************************************/

    html += `
    <br>

    <h2>SECTION D: O'LEVEL RESULTS</h2>

    <table class="previewTable">

        <tr>

            <th>S/N</th>

            <th>Subject</th>

            <th>Grade</th>

        </tr>
    `;


    application.olevel.forEach(function(result,index){

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${result.subject}</td>

            <td>${result.grade}</td>

        </tr>

        `;

    });


    html += "</table>";


    /*********************************************************
                DECLARATION
    *********************************************************/

    html += `

    <br><br>

    <h3>Declaration</h3>

    <p>

    I hereby declare that the information supplied in this application
    form is true and correct to the best of my knowledge.

    </p>

    <br><br>

    <table width="100%">

        <tr>

            <td>

            ___________________________<br>

            Applicant's Signature

            </td>

            <td align="right">

            ___________________________<br>

            Date

            </td>

        </tr>

    </table>

    `;


    preview.innerHTML = html;

}


/*********************************************************************
                PRINT APPLICATION
*********************************************************************/

function printApplication(){

    if(validateForm()){

        generatePreview();

        window.print();

    }

}


/*********************************************************************
                RESET FORM MESSAGE
*********************************************************************/

applicationForm.addEventListener("reset",function(){

    setTimeout(function(){

        alert("Application Form Cleared Successfully.");

    },100);

});


/*********************************************************************
            END OF PROGRAM
*********************************************************************/