document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle-container");
    const piecesContainer = document.getElementById("pieces-container");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const checkBtn = document.getElementById("check-btn");
    const imageSrc = "image/IMG_14.jpg"; // เปลี่ยนเป็นภาพที่ต้องการ
    let pieces = [];
    const gridSize = 3;
    const pieceSize = 100;

    function createPuzzle() {
        for (let i = 0; i < 9; i++) {
            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundSize = `300px 300px`;
            piece.style.backgroundPosition = `${-(i % gridSize) * pieceSize}px ${-Math.floor(i / gridSize) * pieceSize}px`;
            piece.setAttribute("data-index", i);
            piece.draggable = true;
            piece.addEventListener("dragstart", dragStart);
            pieces.push(piece);
        }
        shufflePieces();
    }

    function createSlots() {
        for (let i = 0; i < 9; i++) {
            const slot = document.createElement("div");
            slot.classList.add("piece-slot");
            slot.setAttribute("data-index", i);
            slot.addEventListener("dragover", allowDrop);
            slot.addEventListener("drop", drop);
            puzzleContainer.appendChild(slot);
        }
    }

    function shufflePieces() {
        pieces.sort(() => Math.random() - 0.5);
        piecesContainer.innerHTML = "";
        pieces.forEach(piece => piecesContainer.appendChild(piece));
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.getAttribute("data-index"));
    }

    function drop(event) {
        event.preventDefault();
        let index = event.dataTransfer.getData("text");
        let draggedPiece = document.querySelector(`.piece[data-index='${index}']`);

        if (!event.target.classList.contains("piece-slot")) return;

        if (!event.target.hasChildNodes()) {
            event.target.appendChild(draggedPiece);
        }
    }

    function checkWin() {
        let slots = document.querySelectorAll(".piece-slot");
        let correct = true;

        slots.forEach((slot, i) => {
            if (!slot.hasChildNodes() || slot.firstChild.getAttribute("data-index") != i) {
                correct = false;
            }
        });

        if (correct) {
            setTimeout(() => {
                alert("🎉 คุณต่อถูกแล้ว! 🎉");
                window.location.href = "next.html"; // เปลี่ยนหน้าเมื่อชนะ
            }, 300);
        } else {
            alert("❌ ยังต่อผิดอยู่ ลองใหม่!");
        }
    }

    shuffleBtn.addEventListener("click", shufflePieces);
    checkBtn.addEventListener("click", checkWin);

    createSlots();
    createPuzzle();
});
