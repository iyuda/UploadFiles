window.triggerFileInputClick = function (inputElement) {
    inputElement.click();
};

window.dragDropUpload = {
    initDropZone: function (dropZoneId, dotnetHelper) {
        const dropZone = document.getElementById(dropZoneId);
        if (!dropZone) return;

        dropZone.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        dropZone.addEventListener('drop', function (e) {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length === 0) return;

            // Read files as base64 strings
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = function (event) {
                    // Send file name and content to Blazor
                    dotnetHelper.invokeMethodAsync('ReceiveFile', file.name, event.target.result);
                };
                reader.readAsDataURL(file); // base64 string
            }
        });
    }
};
