export type Mission = {
    id: number
    image: string
    title: string
    time: string
    position: string
    process: number
    isExpired: boolean
    description: string
    host: string
    hostImage: string
}

export const missions: Mission[] = [
    {
        id: 1,
        image: 'https://png.pngtree.com/background/20210710/original/pngtree-cartoon-beach-sunscreen-psd-layered-master-map-background-material-picture-image_1012460.jpg',
        title: 'Giải mật thư',
        time: '20th AUGUST - 16:00',
        position: 'Bãi biển Mỹ Khê, Đà Nẵng',
        process: 100,
        isExpired: false,
        description: 'Tìm mật thư được giấu gần trụ cứu hộ số 5 và giải mã để nhận phần thưởng.',
        host: 'Ban tổ chức địa phương',
        hostImage: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
    },
    {
        id: 2,
        image: 'https://png.pngtree.com/png-vector/20221124/ourlarge/pngtree-cartoon-night-fair-with-food-stalls-and-festivities-vector-png-image_42004958.jpg',
        title: 'Thử thách vị giác',
        time: '26th AUGUST - 18:30',
        position: 'Chợ đêm Helio, Đà Nẵng',
        process: 0,
        isExpired: false,
        description: 'Thử 3 món đặc sản địa phương và chụp ảnh món ăn + hóa đơn: mít trộn, ốc hút, kem cuộn.',
        host: 'Helio Night Market',
        hostImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIvdPGF0wYz4fjkF53oRAJ0P0katNYeOrvJw&s',
    },
    {
        id: 3,
        image: 'https://mir-s3-cdn-cf.behance.net/projects/404/d8f905105150049.Y3JvcCw0Mzk0LDM0MzcsMzgwLDA.png',
        title: 'Phỏng vấn nhanh',
        time: '19th AUGUST - 17:00',
        position: 'Cầu Rồng, Đà Nẵng',
        process: 85,
        isExpired: false,
        description: "Phỏng vấn 2 khách du lịch nước ngoài: 'Bạn nghĩ gì về Đà Nẵng?' và quay video dưới 1 phút.",
        host: 'Cộng đồng hướng dẫn viên',
        hostImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQmH57TRl0ZtNH1Zye8kul6f-6Hi8lCfUTFQ&s',
    },
    {
        id: 4,
        image: 'https://cdn3.ivivu.com/2022/09/bao_tang_dieu_khac_cham_ivivu.jpg',
        title: 'Săn khoảnh khắc vàng',
        time: '24th AUGUST - 17:45',
        position: 'Bảo tàng điêu khắc Chăm',
        process: 20,
        isExpired: false,
        description: 'Chụp ảnh hoàng hôn chiếu vào tượng cổ và chia sẻ trên mạng xã hội kèm hashtag #DaNangMoments.',
        host: 'Hội nhiếp ảnh trẻ',
        hostImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYof986xb0gGxx75B_lW7shXihxJ7Ecj2A-w&s',
    },
    {
        id: 5,
        image: 'https://img.freepik.com/free-vector/shopping-cart-with-bags-gifts-concept-illustration_114360-18775.jpg',
        title: 'Thử thách ngẫu nhiên',
        time: '21st AUGUST - 11:00',
        position: 'Chợ Cồn, Đà Nẵng',
        process: 30,
        isExpired: false,
        description: 'Mua một món bất kỳ được gợi ý bởi người bán hàng ngẫu nhiên và quay video giới thiệu.',
        host: 'Cộng đồng Food Review',
        hostImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQObkXD2u7YPxxHJ_xIcPpVGUgw8_OyCdWMzA&s',
    },
    {
        id: 6,
        image: 'https://static.vinwonders.com/2022/03/bao-tang-my-thuat-da-nang-1-1.jpg',
        title: 'Tái hiện nghệ thuật',
        time: '23rd AUGUST - 15:00',
        position: 'Bảo tàng Nghệ thuật Đà Nẵng',
        process: 60,
        isExpired: false,
        description: 'Chọn một bức tranh trong bảo tàng và tạo dáng giống nhân vật trong tranh – chụp ảnh kèm mô tả.',
        host: 'Bảo tàng Nghệ thuật',
        hostImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOR5coNW3GK2Msa2oAazpLhFTLoGGJD_KbFA&s',
    },
]
