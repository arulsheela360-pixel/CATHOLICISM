// main.js - இதை மட்டும் எல்லா பக்கத்திலும் சேர்த்தால் போதும்
(function() {
    // 1. html2canvas லைப்ரரியை சேர்க்கிறது
    const script1 = document.createElement('script');
    script1.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    document.head.appendChild(script1);

    script1.onload = function() {
        // 2. ஸ்டைல்களை சேர்க்கிறது
        const style = document.createElement('style');
        style.innerHTML = `
            .share-btn {
                position: fixed; bottom: 30px; right: 30px; background-color: #d4af37;
                color: #630e10; width: 65px; height: 65px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.4);
                z-index: 99999; border: 2px solid white; transition: transform 0.3s;
            }
            .share-btn:hover { transform: scale(1.1); }
        `;
        document.head.appendChild(style);

        // 3. பட்டனை உருவாக்குகிறது
        const btn = document.createElement('div');
        btn.className = 'share-btn';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>`;
        document.body.appendChild(btn);

        // 4. ஷேர் செய்யும் பங்க்ஷன்
        btn.onclick = async function() {
            btn.style.display = 'none';
            const canvas = await html2canvas(document.body, { scale: 2 });
            canvas.toBlob(async (blob) => {
                const file = new File([blob], "share.jpg", { type: "image/jpeg" });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: document.title,
                        text: 'Catholicism - ' + document.title
                    });
                }
                btn.style.display = 'flex';
            });
        };
    };
})();
