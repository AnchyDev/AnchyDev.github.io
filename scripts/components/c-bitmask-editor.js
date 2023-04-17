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

function getBitmaskDataFromInput()
{
    let bitmaskDataElement = document.getElementById("bitmask-data");
    if(!bitmaskDataElement)
    {
        return null;
    }

    let bitmaskData = bitmaskDataElement.value;
    if(!bitmaskData)
    {
        return null;
    }

    return bitmaskData;
}

function getBitmaskOptions(bitmaskData)
{
    let decodedData = atob(bitmaskData).split(";");
    return decodedData;
}

function getMaskFromIndex(index)
{
    return 1 << index;
}

function getMaskFromOptions(options)
{
    let mask = 0;
    for(let option in options)
    {
        let optionElement = document.getElementById("bitmask-checkbox-" + option);
        if(optionElement.checked)
        {
            mask += 1 << option;
        }
    }
    return mask;
}

function bitmaskEditOnClick() 
{
    let bitmaskData = this.getBitmaskDataFromInput();
    if(!bitmaskData)
    {
        displayError("Invalid bitmask data string.");
        return;
    }

    let bitmaskOptions = this.getBitmaskOptions(bitmaskData);
    if(bitmaskOptions.length < 1)
    {
        displayError("An unexpected error occurred.");
        return;
    }

    let bitmaskOpsElement = document.getElementById("bitmask-options");
    for(let option in bitmaskOptions)
    {
        let bitmaskOpElement = document.createElement("input");
        bitmaskOpElement.id = `bitmask-checkbox-${option}`;
        bitmaskOpElement.type = "checkbox";
        bitmaskOpsElement.appendChild(bitmaskOpElement);

        let bitmaskOpLabelElement = document.createElement("label");
        bitmaskOpLabelElement.innerHTML = ` (${getMaskFromIndex(option)}): ${bitmaskOptions[option]}`;
        bitmaskOpsElement.appendChild(bitmaskOpLabelElement);

        bitmaskOpsElement.appendChild(document.createElement("br"));
    }

    let bitmaskSubmitElement = document.getElementById("bitmask-completer");
    let bitmaskSubmitButtonElement = document.createElement("button");
    bitmaskSubmitButtonElement.innerHTML = "Generate";
    bitmaskSubmitButtonElement.className = "nice-button";
    bitmaskSubmitButtonElement.onclick = function() {
        let resultElement = document.getElementById("bitmask-result");
        resultElement.innerHTML = `Result: ${getMaskFromOptions(bitmaskOptions)}`
    };
    bitmaskSubmitElement.appendChild(bitmaskSubmitButtonElement);
}