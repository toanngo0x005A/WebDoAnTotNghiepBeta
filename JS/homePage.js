document.addEventListener('DOMContentLoaded', function () {
    // Lấy phần tử carousel (vỏ ngoài) và phần chứa các slide bên trong
    const carousel = document.getElementById('TrinhChieuHinhAnh');
    const carouselInner = carousel.querySelector('.carousel-inner');

    let startX = 0;           // Tọa độ X khi bắt đầu kéo chuột
    let isDragging = false;   // Cờ kiểm tra xem người dùng có đang kéo không
    let moved = false;        // Kiểm tra có thực sự kéo chuột hay không (tránh chỉ click)

    carouselInner.addEventListener('mousedown', (e) => {
        isDragging = true;      // Bắt đầu kéo
        moved = false;          // Chưa có di chuyển gì cả
        startX = e.clientX;     // Ghi lại vị trí X bắt đầu
    });

    carouselInner.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
            moved = true;           // Đã có di chuyển
            e.preventDefault();     // Ngăn hành vi kéo ảnh mặc định của trình duyệt
    });

    const endDrag = (e) => {
        if (!isDragging || !moved) return; // Nếu không kéo hoặc chỉ click, bỏ qua
            isDragging = false;                // Dừng kéo

            const diffX = e.clientX - startX;  // Tính khoảng cách kéo theo trục X

        if (Math.abs(diffX) > 50) {        // Nếu kéo đủ xa (tránh thao tác vô tình)
        /* Để đạt trải nghiệm tốt trên PC (chuột hoặc touchpad) lẫn mobile (cảm ứng) thì Math.abs(diffX) > 50 là 
        mức hợp lý và phổ biến nhất. */
            const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel); // Lấy hoặc tạo instance của carousel
            diffX < 0 ? bsCarousel.next() : bsCarousel.prev(); // Kéo trái thì next, kéo phải thì prev
        }
    };

    carouselInner.addEventListener('mouseup', endDrag);         // Kết thúc kéo bằng chuột
    carouselInner.addEventListener('mouseleave', () => isDragging = false); // Nếu rê ra ngoài thì cũng hủy kéo

    // Ngăn người dùng kéo hình ảnh (tránh bị "copy" ảnh khi kéo)
    carouselInner.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');                   // Vô hiệu hóa kéo ảnh
        img.addEventListener('dragstart', e => e.preventDefault()); // Chặn hành vi kéo ảnh mặc định
    });
});
