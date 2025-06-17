window.fileDropUploader = {
    initDropZone: function (dropZoneId, uploadUrl, statusId) {
        const dropZone = document.getElementById(dropZoneId);
        const status = document.getElementById(statusId);

        if (!dropZone) return;

        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropZone.classList.add("dragging");
        });

        dropZone.addEventListener("dragleave", function () {
            dropZone.classList.remove("dragging");
        });

        dropZone.addEventListener("drop", function (e) {
            e.preventDefault();
            dropZone.classList.remove("dragging");

            const files = e.dataTransfer.files;
            if (files.length > 5) {
                status.textContent = "Please upload 5 files or fewer.";
                return;
            }

            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            fetch(uploadUrl, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    status.textContent = `${result.count} file(s) uploaded successfully.`;
                })
                .catch(error => {
                    console.error("Upload failed", error);
                    status.textContent = "Upload failed.";
                });
        });
    }
};
