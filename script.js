var imgIndex = 1;
var fileName ="New file";
var downloadText="";
var poseDic = {
  "Crossed Arms": 0,
  "Crossed Legs": 1,
  "Turning Back": 2,
  "Biting Nails": 3,
  "Hands in Pockets": 4,
  "Hands on Hips": 5,
  "Foot Against the Wall": 6,
  "Side Bending": 7,
  "Thinking Pose": 8,
  "Wrist Grab Pose": 9,
  "Hand Behind Head": 10,
  "Netural Pose": 11
}
files = [];
function leadingZero() {
    let printedIndex
    if (imgIndex <= 9) {
        printedIndex = "000" + imgIndex;
    }
    else if (imgIndex >= 10 && imgIndex <= 99) {
        printedIndex = "00" + imgIndex;
    }
    else if (imgIndex >= 100 && imgIndex <= 999) {
        printedIndex = "0" + imgIndex;
    }
    else {
      printedIndex = imgIndex;
    }
    return printedIndex;
}
function displayFrame(e) {
       $("img[alt='Frame']").attr('src', e.target.result);
       if(imgIndex == $("input[type='file']").prop('files').length)
       $("#imgIndex").text(imgIndex + " (last frame)");
       else
       $("#imgIndex").text(imgIndex);
   };
function download(text, name, type) {
  var a = document.getElementById("a");
  var file = new Blob([text], {type: type});
  console.log(file);
  a.href = URL.createObjectURL(file);
  a.download = name;
}
function getFile(evt)
{
  fileName = $("input[type='text']").val()
  download(downloadText, fileName,"text/plain" );
}
function appendFile(evt, index)
{
  if ($("input[type='file']").prop('files').length != 0) {
        var file = $("input[type='file']").prop('files')[index];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = displayFrame;
    }
}
function appendText(){
  let lines = downloadText.split('\n');
  for (let index = 0; index < lines.length; index++)
  {
    if(lines[index].indexOf(leadingZero(imgIndex)) != -1)
    {
    console.log(lines[index]);
    lines.splice(index,index+1)
    }
  }
  downloadText = lines.join('\n');
  downloadText +=leadingZero(imgIndex);
  $("input[type='checkbox']").each( function(evt){
    if($(this).prop('checked'))
    {
      downloadText += " ";
      let temp = $(this).prop('name');
      downloadText +=poseDic[temp];
    }
  });
  downloadText += '\n';
}

$("document").ready(function() {
  $("input[type='file']").change(function (evt) {
    imgIndex = 1;
    downloadText="";
    appendFile(evt, imgIndex -1);
  });
  $("a[id='prev']").click(function (evt) {
    appendText();
    if(imgIndex == 1)
    imgIndex = $("input[type='file']").prop('files').length;
    else
    imgIndex--;
    appendFile(evt, imgIndex -1);
  });
  $("a[id='next']").click(function (evt) {
    appendText();
    if(imgIndex == $("input[type='file']").prop('files').length)
    imgIndex = 1;
    else
    imgIndex++;
    appendFile(evt, imgIndex -1);
  });
  $("#a").click(function (evt) {
    appendText();
    getFile(evt);
  });
});
