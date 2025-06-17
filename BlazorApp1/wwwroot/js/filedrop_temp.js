window.fileDropHelper = {
    handleDrop: function (dropZoneId, dotNetRef) {
        const dropZone = document.getElementById(dropZoneId);
        if (!dropZone) return;

        dropZone.addEventListener("drop", function (event) {
            event.preventDefault();
            const files = event.dataTransfer.files;

            const fileList = [];
            for (let i = 0; i < files.length && i < 5; i++) {
                fileList.push({
                    name: files[i].name,
                    size: files[i].size,
                    type: files[i].type
                });
            }

            // Store files for upload using a hidden input (next step)
            const input = document.getElementById("fileInput");
            input.files = files;

            dotNetRef.invokeMethodAsync("TriggerUpload");
        });

        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
    }
};
