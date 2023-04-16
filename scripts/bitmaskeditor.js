function getBitmasksFromInput(input)
{
  var data = input.split(";");
  return data;
}

function getBitmaskFromMasks(masks)
{
  var value = 0;

  for(var mask in masks)
  {
    var bitmaskId = "Bitmask" + mask;
    var bitmaskInput = document.getElementById(bitmaskId);
    if(bitmaskInput.checked)
    {
      value += 1 << mask;
    }
  }

  return value;
}

var button = document.getElementById("BitmaskEditButton");

button.onclick = function() {
  var bitmaskDefinition = atob(document.getElementById("BitMaskDefinition").value);
  var bitmaskMessage = document.getElementById("BitmaskMessage");

  if(!bitmaskDefinition)
  {
    bitmaskMessage.innerHTML = "You need to enter a bitmask definition to edit.<br>";
    return;
  }

  var bitmasks = getBitmasksFromInput(bitmaskDefinition);

  bitmaskMessage.innerHTML = "";

  var editor = document.getElementById("BitmaskEditor");
  var output = document.getElementById("BitmaskOutput");

  var innerHtml = "";
  for(var bitmask in bitmasks)
  {
    innerHtml += '<input id="Bitmask' + bitmask + '" type="checkbox"><label for="Bitmask' + bitmask + '"> ' + bitmasks[bitmask] + '</label><br>';
  }
  innerHtml += '<button id="BitmaskSubmitButton" class="nice-button">Generate</button><br>';
  editor.innerHTML = innerHtml;

  var submitButton = document.getElementById("BitmaskSubmitButton");
  submitButton.onclick = function() {
    innerHtml = "";
    innerHtml = "<h3>Bitmask: " + getBitmaskFromMasks(bitmasks) + " </h3>";
    output.innerHTML = innerHtml;
  };
};