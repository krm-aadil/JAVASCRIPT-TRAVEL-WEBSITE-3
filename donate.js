

  // *******************************Donation form sript***************************
  function tc(a){
    let x = document.querySelector(a).value;
    return x;
  }
  function msg(a){
    let x = document.querySelector(".emsg").innerHTML=a;
    return x;
  }
  function msgb(a){
    let x = document.querySelector(".emsgb").innerHTML=a;
    return x;
  }
  function size(a){
    let x = document.querySelector(a).value.length;
    return x;
  }



  function myFunction() {
    let don_t = 0;
    let dona = document.forms[0];
    
    let i;
    for (i = 0; i < dona.length; i++) {
      if (dona[i].checked) {
       don_t += (dona[i].value * 1);
        
      }
    }
    document.getElementById("order").value = "The amount of your donation: " + don_t;
  }

   

  function singu() {
    let hide=document.querySelector(".form-login");
  
    if (hide.classList[1]=="hidden") {
      hide.classList.toggle("visible");
    }else {
      hide.classList.toggle("hidden");
    }
    console.log(hide.classList);
    return hide;
  }
  
  function singup(){
    
    if (tc(".fname")==null || tc(".fname")=="") {
      msgb("Please Enter First name");
      return false;
    }
    if (tc(".lname")==null || tc(".lname")=="") {
      msgb("Please Enter Last name");
      return false;
    }
    if (tc(".email")==null || tc(".email")=="") {
      msgb("Please Enter Email");
      return false;
    }

    if (tc(".hName")==null || tc(".hName")=="") {
        msgb("Please Enter the card holders name");
        return false;
      }

    if (tc(".d_cardNum") == null || tc(".d_cardNum")=="") {
        msgb("Please Enter the card Number");
        return false;
      }

    if (tc(".hName")==null || tc(".hName")=="") {
        msgb("Please Enter the card holders name");
        return false;
      }

    if (tc(".date")==null || tc(".date")=="") {
        msgb("Please Enter the date");
        return false;
       
        
    }

    if (tc(".cvv")==null || tc(".cvv")=="") {
        msgb("Please Enter the cvv");
        return false;
       
        
    }

      alert("Thank you for the Donation!");

  }
  



  