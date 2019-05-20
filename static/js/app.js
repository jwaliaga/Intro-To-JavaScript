// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");

tableData.forEach(function(eyeWitness){
    // console.log(eyeWitness);
    var row = tbody.append("tr");
    Object.entries(eyeWitness).forEach(function([key,value]){
        // console.log(key,value);
        row.append("td").text(value)
    });
})

// Select the submit button
var filterBtn = d3.select("#filter-btn");

var arrCountry = d3.map(data, function(d){return d.country}).keys().sort();
var arrState = d3.map(data, function(d){return d.state}).keys().sort();
var arrCity = d3.map(data, function(d){return d.city}).keys().sort();
var arrShape = d3.map(data, function(d){return d.shape}).keys().sort();

console.log(arrCountry);
console.log(arrState);
console.log(arrCity);
console.log(arrShape);

var dropdownCountry = d3.select("#country");
arrCountry.forEach(function(shape){
    dropdownCountry.append("option").text(shape)
})

var dropdownState = d3.select("#state");
arrState.forEach(function(shape){
    dropdownState.append("option").text(shape)
})

var dropdownCity = d3.select("#city");
arrCity.forEach(function(shape){
    dropdownCity.append("option").text(shape)
})

var dropdownShape = d3.select("#shape");
arrShape.forEach(function(shape){
    dropdownShape.append("option").text(shape)
})

function handleChangeCountry() {
    // grab the value of the input field
    var inputCountry = d3.event.target.value;
    console.log(inputCountry)

    // inputCountry = this.options[this.selectedIndex].value

    function filterCountry(dat){
        // return dat.country === dropdownCountry.select("option").text();
        if (inputCountry===""){
            flagCountry = true;
        }
        else{
            flagCountry = dat.country === inputCountry;
        }
        // return dat.country === inputCountry;
        return flagCountry
    };
    
    var tableDataCountry = tableData.filter(filterCountry);
    console.log(tableDataCountry)
    
    var arrState = d3.map(tableDataCountry, function(d){return d.state}).keys().sort();   
    console.log(arrState)

    // Clear the selection
    d3.select("#state").text("")

    var dropdownState = d3.select("#state");
    dropdownState.append("option").text("")
    arrState.forEach(function(State){
        dropdownState.append("option").text(State)
    })

    var arrCity = d3.map(tableDataCountry, function(d){return d.city}).keys().sort();
    console.log(arrCity)

    // Clear the selection
    d3.select("#city").text("")

    var dropdownCity = d3.select("#city");
    dropdownCity.append("option").text("")
    arrCity.forEach(function(City){
        dropdownCity.append("option").text(City)
    })
  }

  function handleChangeState() {
    // grab the value of the input field
    var inputState = d3.event.target.value;
    console.log(inputState);
    var inputCountry  = d3.select("#country").property("value");
    console.log(inputCountry);

    // inputCountry = this.options[this.selectedIndex].value

    function filterCountryState(dat){
        // return dat.country === dropdownCountry.select("option").text();
        if (inputState===""){
            if (inputCountry==""){
                flagCountryState = true;
            }
            else{
                flagCountryState = dat.country === inputCountry;
            }
        }
        else{
            if (inputCountry==""){
                flagCountryState = dat.state === inputState;
            }
            else{
                flagCountryState = dat.state === inputState && dat.country === inputCountry;
            }
        }
        return flagCountryState
    };
    
    var tableDataCountryState = tableData.filter(filterCountryState);
    console.log(tableDataCountryState)
    
    var arrCity = d3.map(tableDataCountryState, function(d){return d.city}).keys().sort();
    console.log(arrCity)

    // Clear the selection
    d3.select("#city").text("")

    var dropdownCity = d3.select("#city");
    dropdownCity.append("option").text("")
    arrCity.forEach(function(City){
        dropdownCity.append("option").text(City)
    })
  }

// dropdownCountry.select("option").on("change",handleChange)
dropdownCountry.on("change",handleChangeCountry)

dropdownState.on("change",handleChangeState)



var inputValueDate = "1/11/2011"

filterBtn.on("click",function(){
    // Prevent the page from refreshing    
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCountry = d3.select("#country");
    var inputElementState = d3.select("#state");
    var inputElementCity = d3.select("#city");
    var inputElementShape = d3.select("#shape");

    // Get the value property of the input element
    inputValueDate = inputElementDate.property("value");
    inputValueCountry = inputElementCountry.property("value");
    inputValueState = inputElementState.property("value");
    inputValueCity = inputElementCity.property("value");
    inputValueShape = inputElementShape.property("value");

    console.log(inputValueDate)
    console.log("1/10/2010")
    console.log(inputValueDate == "1/10/2010");

    function selectEyeWitness(eyeWitness){
        FlagDate = inputValueDate === "" || eyeWitness.datetime === inputValueDate.toLowerCase();
        FlagCountry = inputValueCountry === "" || eyeWitness.country === inputValueCountry.toLowerCase();
        FlagState = inputValueState === "" || eyeWitness.state === inputValueState.toLowerCase();
        FlagCity = inputValueCity === "" || eyeWitness.city === inputValueCity.toLowerCase();
        FlagShape = inputValueShape === "" || eyeWitness.shape === inputValueShape.toLowerCase();

        // return eyeWitness.datetime == inputValueDate;
        return FlagDate && FlagCountry && FlagState && FlagCity && FlagShape;
    };
    
    // Filtering data
    var filtertableData = tableData.filter(selectEyeWitness);

    var tbody = d3.select("tbody");

    // Clear the table
    d3.select("tbody").text("")

    filtertableData.forEach(function(eyeWitness){     
        var row = tbody.append("tr");
        Object.entries(eyeWitness).forEach(function([key,value]){
            row.append("td").text(value)
        });
    })
});