/**
 * Cloud save bridge for Data Illustrator.
 *
 * Captures the app's FileSaver saveAs output and routes project JSON through
 * dataviz-tool-header's cloud save modal.
 */

(function () {
    const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;

    let capturedBlob = null;
    let isInterceptingDownload = false;

    function showToast(msg, type = 'info', duration = 3000) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (toolHeader && toolHeader.showMessage) {
            toolHeader.showMessage(msg, type, duration);
        } else {
            console.log('Toast:', msg, type);
        }
    }

    function showProcessingToast(message, duration = 5000) {
        showToast(message, 'info', duration);
    }

    function passthroughDownload(blob, name) {
        showProcessingToast(t('processing_export'));
        console.log('[CloudSaveBridge] Passthrough saveAs for local download');

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name || 'download';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    async function generateThumbnail() {
        const svg = document.querySelector('svg');
        if (!svg) return null;

        const contentNode = svg.querySelector('#scene1') || svg;

        let bbox;
        try {
            bbox = contentNode.getBBox ? contentNode.getBBox() : contentNode.getBoundingClientRect();
        } catch (e) {
            console.warn('Could not get bbox of content, falling back to SVG rect', e);
            bbox = svg.getBoundingClientRect();
        }

        const padding = 20;
        const viewBoxX = bbox.x - padding;
        const viewBoxY = bbox.y - padding;
        const viewBoxW = bbox.width + (padding * 2);
        const viewBoxH = bbox.height + (padding * 2);

        const serializer = new XMLSerializer();
        const clone = svg.cloneNode(true);
        clone.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`);
        clone.setAttribute('width', viewBoxW);
        clone.setAttribute('height', viewBoxH);

        const evtLayer = clone.querySelector('#evtLayer');
        if (evtLayer) evtLayer.remove();

        const svgStr = serializer.serializeToString(clone);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        canvas.width = viewBoxW;
        canvas.height = viewBoxH;

        const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve) => {
            img.onload = () => {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (e) => {
                console.error('Thumbnail generation failed', e);
                resolve(null);
            };
            img.src = url;
        });
    }

    function showSaveModal(data, thumbnail) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (!toolHeader) {
            showToast(t('error_header_not_ready'), 'error');
            return;
        }

        toolHeader.showSaveModal({
            data: data,
            thumbnailDataUri: thumbnail || null
        });
    }

    function monitorSaveProcess() {
        let attempts = 0;
        const maxAttempts = 50;

        const pollTimer = setInterval(async () => {
            attempts++;

            if (capturedBlob) {
                clearInterval(pollTimer);
                isInterceptingDownload = false;

                const textData = await capturedBlob.text();
                let jsonData;
                try {
                    jsonData = JSON.parse(textData);
                } catch (e) {
                    console.error('Not a JSON file?', textData.substring(0, 100));
                    showToast(t('not_valid_json'), 'error');
                    return;
                }

                const thumbDataUri = await generateThumbnail();
                showSaveModal(jsonData, thumbDataUri);
                return;
            }

            if (attempts >= maxAttempts) {
                clearInterval(pollTimer);
                isInterceptingDownload = false;
                console.error('CloudSaveBridge: Save timeout - Blob not captured.');
            }
        }, 100);
    }

    window.saveAs = function (blob, name) {
        if (isInterceptingDownload) {
            console.log('[CloudSaveBridge] Intercepted saveAs for Cloud Save');
            capturedBlob = blob;
            return;
        }

        passthroughDownload(blob, name);
    };

    window.CloudSaveBridge = {
        startCloudSave() {
            showProcessingToast(t('processing_save_prep'));
            capturedBlob = null;
            isInterceptingDownload = true;
            monitorSaveProcess();
        }
    };
})();
