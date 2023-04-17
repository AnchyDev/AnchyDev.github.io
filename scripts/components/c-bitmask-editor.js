function displayError(msg)
{
    let errorMsg = document.getElementById("bitmask-error");

    if(errorMsg)
    {
        errorMsg.innerHTML = msg;
        errorMsg.style.display = "block";
    }
}

function hideError()
{
    let errorMsg = document.getElementById("bitmask-error");

    if(errorMsg)
    {
        errorMsg.style.display = "none";
    }
}

function bitmaskEditOnClick() 
{
    displayError("An unexpected error occurred!");
}