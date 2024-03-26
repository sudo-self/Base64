async function encodeImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select an image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const base64EncodedImage = event.target.result;
    document.getElementById('encodedImage').innerHTML = `<img src="${base64EncodedImage}" alt="Encoded Image">`;
    document.getElementById('encodedCode').value = base64EncodedImage; // Store the base64 data in the textarea
  };

  reader.readAsDataURL(file);
}

function copyToClipboard() {
  const textarea = document.getElementById('encodedCode');
  textarea.select();
  document.execCommand('copy');
  alert('Code copied to clipboard!');
}

function downloadImage() {
  const base64EncodedImage = document.getElementById('encodedCode').value;
  const blob = new Blob([base64EncodedImage], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'encoded_image.txt'; // Set the name of the downloaded file here
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Text file downloaded!');
}

function downloadCSS() {
  const base64EncodedImage = document.getElementById('encodedCode').value;
  const cssContent = `body {
    background-image: url("${base64EncodedImage}");
    background-repeat: no-repeat;
    background-size: 80%;
    background-attachment: fixed;
  }`;
  const blob = new Blob([cssContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'background.css'; // Set the name of the downloaded file here
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('CSS file downloaded!');
}

function displayImage(input) {
  var file = input.files[0];
  var imageType = /image.*/;

  if (file.type.match(imageType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var img = new Image();
      img.src = reader.result;

      img.onload = function() {
        var width = this.width;
        var height = this.height;
        document.getElementById('thumbnail').src = this.src;
        document.getElementById('thumbnail').style.display = 'inline';
        document.getElementById('resolution').innerText = width + " x " + height;
      };
    };

    reader.readAsDataURL(file);
  } else {
    alert("File format not supported!");
  }
}
