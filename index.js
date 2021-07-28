"use strict";

  
  
  // handle response with callback and error
  // const test = () => {
    const updateType = document.querySelector("#updateType");
    const updateName = document.querySelector("#updateName");
    const updatePercentage = document.querySelector("#updatePercentage");
    const updateBrewTime = document.querySelector("#updateBrewTime");
    //}
    const data1 = {
        id: 0,
        type: 'Cider',
        name: 'Gold',
        percentage: 7,
        brewTime: 10
    }
    console.log(data1);
    const baseURL = "http://localhost:8080";

  const getAllOutput = document.querySelector("#getAllOutput");
  const getByIdOutput = document.querySelector("#getByIdOutput");
  const brewId = document.querySelector("#brewId");
  
  
  const getAllBrews = () => {
      axios.get(`${baseURL}/getAllBrews`)
      .then(res => {
          const brews = res.data;
  
          getAllOutput.innerHTML = ""; // blanks an element
  
          brews.forEach(brew => renderBrew(brew, getAllOutput));
      }).catch(err => console.log(err)); //calling from table
  }


  const renderBrew = (brew, outputDiv) => {   
      const brewColumn = document.createElement('div');
      brewColumn.classList.add("col");
  
      const brewCard = document.createElement('div');
      brewCard.classList.add("card");
      brewColumn.appendChild(brewCard);
  
      const newBrew = document.createElement('div');
      newBrew.classList.add("card-body"); // adding text
      
      const brewType = document.createElement("h3");
      brewType.innerText = brew.type;
      brewType.classList.add("card-title");
      newBrew.appendChild(brewType); //getting type

      const brewId = document.createElement("p");
      brewId.innerText = `ID: ${brew.id}`;
      brewId.classList.add("card-text");
      newBrew.appendChild(brewId); // adding the ID
  
      const brewName = document.createElement("p");
      brewName.innerText = `Name: ${brew.name}`;
      brewName.classList.add("card-text");
      newBrew.appendChild(brewName); // adding the name
  
      const brewPercentage = document.createElement("p");
      brewPercentage.innerText = `Percentage: ${brew.percentage}`; 
      brewPercentage.classList.add("card-text");
      newBrew.appendChild(brewPercentage); // adding percentage
  
      const brewTime = document.createElement("p");
      brewTime.innerText = `Brew Time: ${brew.brewTime}`; 
      brewTime.classList.add("card-text");
      newBrew.appendChild(brewTime); // adding brew time 
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = "DELETE";
      deleteButton.classList.add("btn", "btn-primary");
      deleteButton.addEventListener('click', () => deleteBrew(brew.id)); // adding delete button
      
      const updateButton = document.createElement('button');
      updateButton.innerText = "Update";
      updateButton.classList.add("btn", "btn-primary");
      updateButton.addEventListener('click', () => {
        data1.id=brew.id,
        updateType.value = brew.type,
        updateName.value = brew.name,
        updatePercentage.value = brew.percentage,
        updateBrewTime.value = brew.brewTime
      });
  
      newBrew.appendChild(updateButton); 
  
      newBrew.appendChild(deleteButton);
  
      brewCard.appendChild(newBrew);
  
      outputDiv.appendChild(brewColumn);
  }
  document.querySelector('#updateBrew>form').addEventListener('submit', (e) =>{
  
  e.preventDefault();
  const data = {
    type: updateType.value,
    name: updateName.value,
    percentage: updatePercentage.value,
    brewTime: updateBrewTime.value
  }
  axios.put('${baseURL}/replaceBrew/${data1.id}', data)
  .then(res => {
       console.log(updateType);
       const brew = res.data;
      console.log(res.data);

      console.log(brew.id);

  }).catch(err => console.log(err));
  

  
  getAllBrews();
  //location.reload();
}
)

    
  const deleteBrew = id => {
      axios.delete(`${baseURL}/deleteBrew/${id}`)
          .then(res => {
              console.log(res);
              getAllBrews();
          }).catch(err => console.log(err)); //funtion for delete
  }
  
  const getBrewById = () => {
      axios.get(`${baseURL}/getBrews/${brewId.value}`)
      .then(res => {
          const brew = res.data;
          getByIdOutput.innerHTML = "";
          renderBrew(brew, getByIdOutput);
      }).catch(err => console.log(err)); //get by id function 
  }
 

  
  document.querySelector("button#getid").addEventListener('click', getBrewById);
  
  document.querySelector("section#postSection > form").addEventListener('submit', (e) => {

      e.preventDefault(); // stops the form submitting in the default way
  
      const form = e.target;
  
      const data = {
          type: form.type.value,
          name: form.name.value,
          percentage: form.percentage.value,
          brewTime: form.Time.value
      }
  
      console.log("DATA: ", data);
  
      axios.post(`${baseURL}/createBrew`, data)
      .then((res) => {
          console.log(res);
          getAllBrews();
  
          form.reset(); //resets form
          form.name.focus(); // selects the name input
      }).catch(err => console.log(err));
  });
 
  