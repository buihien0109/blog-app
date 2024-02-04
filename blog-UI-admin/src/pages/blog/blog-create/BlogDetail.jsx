import { DeleteOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Upload,
    theme,
} from "antd";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const blog = {
    id: 36870,
    title: "Làm ứng dụng Music Player bằng Javascript",
    content:
        'Chào các bạn, trong bài viết này chúng ta sẽ cùng nhau làm ứng dụng nghe nhạc " `Music Player`" bằng javascript. Chắc trong số chúng ta ai cũng thích nghe nhạc phải không nào, thay vì hằng ngày chúng ta nghe nhạc qua youtube, qua zing mp3, vậy tại sao chúng ta không tự tạo ra một ứng dụng nghe nhạc cơ bản bằng chính khả năng của chúng ta. Có phải sẽ thú vị hơn không 😁😁\n\nVới ứng dụng Music Player chúng ta có thể làm các chức năng đơn giản sau:\n\n- Play bài hát\n- Pause bài hát\n- Chuyển bài qua lại\n- Tua bài hát\n- ...\n\nĐây là giao diện ứng dụng Music Player ban đầu chúng ta, mình để link source ở đây để các bạn có thể tham khảo : [https://github.com/buihien0109/music-player/tree/main/start](https://github.com/buihien0109/music-player/tree/main/start)\n\nNgoài ra các bạn có thể tạo giao diện ứng dụng theo ý thích và phong cách của mình\n\n![demo music player app](https://media.techmaster.vn/api/static/9479/c6iesrs51cof74mrqnfg)\n\nBắt đầu thôi nào 😁😁😁\n\n### Hiển thị thông tin bài hát\n\nMặc định ban đầu chúng ta sẽ hiển thị ra 1 bài hát bất kỳ với tiêu đề, audio và ảnh tương ứng với bài hát đó\n\n```javascript\nconst audio = document.getElementById("audio");\nconst title = document.getElementById("title");\nconst cover = document.getElementById("cover");\n\n// Tiêu đề bài hát, tương ứng với các file mp3\nconst songs = ["mot_phut", "hen_yeu", "roi_xa"];\n\n// Lấy index bất kỳ trong mảng songs để hiện thị\nlet songIndex = 2;\n\n// Load 1 bài hát theo index\nloadSong(songs[songIndex]);\n\n// Cập nhật thông tin bài hát\nfunction loadSong(song) {\n    title.innerText = song;\n    audio.src = `music/${song}.mp3`;\n    cover.src = `images/${song}.jpg`;\n}\n```\n\nHiện tại trong project, chúng ta mockup sẵn 3 audio tương ứng là các giá trị trong mảng **songs**\n\nFunction **loadSong** giúp chúng ta hiển thị thông tin bài hát\n\n### Play & Pause\n\nMặc định ban đầu thì bài hát ở trạng thái " `pause`", chúng ta sẽ thực hiện click để play audio\n\nTuy nhiên chúng ta cần phải biết khi nào thì play, khi nào thì pause. Để làm điều này, chúng ta sẽ phụ thuộc vào class " `play`" trong element " `musicContainer`"\n\nĐịnh nghĩa 2 function :\n\n- `playSong` để phát nhạc\n- `pauseSong` để tam dừng\n\n```javascript\nconst musicContainer = document.getElementById("music-container");\nconst playBtn = document.getElementById("play");\n\n// Play song\nfunction playSong() {\n    musicContainer.classList.add("play");\n    playBtn.querySelector("i.fas").classList.remove("fa-play");\n    playBtn.querySelector("i.fas").classList.add("fa-pause");\n\n    audio.play();\n}\n\n// Pause song\nfunction pauseSong() {\n    musicContainer.classList.remove("play");\n    playBtn.querySelector("i.fas").classList.add("fa-play");\n    playBtn.querySelector("i.fas").classList.remove("fa-pause");\n\n    audio.pause();\n}\n\n// Lắng nghe sự kiện\nplayBtn.addEventListener("click", () => {\n    // Kiểm tra xem musicContainer có chứa class "play" hay không?\n    const isPlaying = musicContainer.classList.contains("play");\n\n    // Nếu có thì thực hiện pause\n    // Nếu không thì thực hiện play\n    if (isPlaying) {\n        pauseSong();\n    } else {\n        playSong();\n    }\n});\n```\n\n### Progress song\n\nTheo mặc định là khi chúng ta bắt đầu 1 bài hát mới thì thanh tiến trình (progress bar) bắt đầu chạy, dựa vào progress chúng ta có thể biết được tiến độ phát bài hát. Để làm được điều này, chúng ta lắng nghe sự kiện " `timeupdate`" của `audio` element, và gọi hàm xử lý tương ứng là `updateProgress`.\n\nSự kiện " `timeUpdate`" được kích hoạt khi vị trí phát của audio/video bị thay đổi.\n\nNgoài ra, chúng ta có thể "tua" nhanh bài hát đến 1 vị trí được chỉ định trên thanh progress. Ở đây chúng ta sẽ lắng nghe sự kiện "click" trên `progressContainer` element để update `currentTime` của audio\n\n```javascript\nconst progress = document.getElementById("progress");\nconst progressContainer = document.getElementById("progress-container");\n\n// Time/song update\naudio.addEventListener("timeupdate", updateProgress);\n\n// Click on progress bar\nprogressContainer.addEventListener("click", setProgress);\n\n// Update progress bar\nfunction updateProgress(e) {\n    const { duration, currentTime } = e.srcElement;\n    const progressPercent = (currentTime / duration) * 100;\n    progress.style.width = `${progressPercent}%`;\n}\n\n// Set progress bar\nfunction setProgress(e) {\n    const width = this.clientWidth;\n    const clickX = e.offsetX;\n    const duration = audio.duration;\n\n    audio.currentTime = (clickX / width) * duration;\n}\n```\n\n### Next song & Prev song\n\nMột tính năng rất quan trọng trong một ứng dụng "`Music Player`" là next và prev bài hát. Để làm được điều này chúng ta lắng nghe sự kiện "click" trên 2 nút `nextBtn` gọi hàm xử lý `nextSong` để thực hiện next bài hát và nút `prevBtn` gọi hàm xử lý `prevSong` để thực hiện prev bài hát\n\n```javascript\nconst prevBtn = document.getElementById("prev");\nconst nextBtn = document.getElementById("next");\n\n// Lắng nghe sự kiện khi next và prev bài hát\nprevBtn.addEventListener("click", prevSong);\nnextBtn.addEventListener("click", nextSong);\n\n// Lắng nghe sự kiện khi kết thúc bài hát\naudio.addEventListener("ended", nextSong);\n\n// Xử lý khi prev bài hát\nfunction prevSong() {\n    // Giảm index của songIndex đi 1\n    songIndex--;\n\n    // Nếu đang là bài hát đầu thì quay lại bài hát cuối\n    if (songIndex < 0) {\n        songIndex = songs.length - 1;\n    }\n\n    // Cập nhật thông tin của bài hát lên giao diện\n    loadSong(songs[songIndex]);\n\n    // Phát nhạc\n    playSong();\n}\n\n// Xử lý khi next bài hát\nfunction nextSong() {\n    // Tăng index của songIndex lên 1\n    songIndex++;\n\n    // Nếu đang là bài hát cuối thì quay lại bài hát đầu\n    if (songIndex > songs.length - 1) {\n        songIndex = 0;\n    }\n\n    // Cập nhật thông tin của bài hát lên giao diện\n    loadSong(songs[songIndex]);\n\n    // Phát nhạc\n    playSong();\n}\n```\n\nVà đây là kết quả cuối cùng của chúng ta\n\n![kết quả](https://media.techmaster.vn/api/static/9479/c6ioqls51cof74mrqnh0)\n\nVậy là chúng ta đã hoàn thành ứng dụng "Music Player" với các chức năng cơ bản. Hi vọng các bạn thấy bài viết này hữu ích và thú vị 😁😁😁\n\nPhần sources code của bài viết này, các bạn có thể tham khảo tại đây: [https://github.com/buihien0109/music-player/tree/main/final](https://github.com/buihien0109/music-player/tree/main/final)\n\n> Các bạn có thể tham khảo thêm khóa học này nhé:\n\n- Javascript căn bản - Tổng hợp 12 game huyền thoại - [tại đây](https://techmaster.vn/khoa-hoc/ev5/javascript-can-ban-tong-hop-12-game-huyen-thoai).\n- Lập trình Game Javascript (trực tuyến có tương tác) - [tại đây](https://codegame.techmaster.vn/).',
    description:
        "Chào các bạn, trong bài viết này chúng ta sẽ cùng nhau làm ứng dụng nghe nhạc &#34;Music Player&#34; bằng javascript\n",
    thumbnail: "https://placehold.co/200x200?text=BH",
    status: true,
    categories: [
        { label: "ReactJS", value: 1 },
        { label: "NodeJS", value: 2 },
        { label: "MongoDB", value: 3 },
    ],
};

const imageUrls = [...Array(12).keys()].map(
    (index) => `https://placehold.co/200x200?text=${index}`
);

const breadcrumb = [
    { label: "Danh sách bài viết", href: "/admin/blogs" },
    { label: blog.name, href: `/admin/blogs/${blog.id}/detail` },
];

const BlogDetail = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSelected, setImageSelected] = useState(null);
    const [thumbnail, setThumbnail] = useState(blog.thumbnail);
    const [images, setImages] = useState(imageUrls);

    const handleUpdate = async () => {
        try {
            // Validate fields
            const values = await form.validateFields();
            console.log("Form data values:", values);

            // TODO: Gửi dữ liệu lên server
        } catch (error) {
            // Handle validation error
            console.error("Validation failed:", error);
        }
    };

    const selecteImage = (image) => () => {
        setImageSelected(image);
    };

    const handleUploadImage = (info) => {
        const { file } = info;
        console.log("file", file);

        // Create temp url
        const tempUrl = URL.createObjectURL(file);
        setImages([tempUrl, ...images]);
    };

    const handleDelete = () => {
        console.log("Delete blog");
    };

    return (
        <>
            <AppBreadCrumb items={breadcrumb} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Flex justify="space-between" align="center">
                    <Space style={{ marginBottom: "1rem" }}>
                        <RouterLink to="/admin/blogs">
                            <Button type="default" icon={<LeftOutlined />}>
                                Quay lại
                            </Button>
                        </RouterLink>
                        <Button
                            style={{ backgroundColor: "rgb(60, 141, 188)" }}
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={handleUpdate}
                        >
                            Cập nhật
                        </Button>
                    </Space>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={handleDelete}
                    >
                        Xóa bài viết
                    </Button>
                </Flex>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{
                        ...blog,
                        categoryIds: blog.categories.map(
                            (category) => category.value
                        ),
                    }}
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                label="Tiêu đề"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tiêu đề không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter title" />
                            </Form.Item>

                            <Form.Item
                                label="Nội dung"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Nội dung không được để trống!",
                                    },
                                ]}
                            >
                                <SimpleMDE />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mô tả không được để trống!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Enter description"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Trạng thái không được để trống!",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    options={[
                                        { label: "Nháp", value: false },
                                        { label: "Công khai", value: true },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item label="Danh mục" name="categoryIds">
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    options={[
                                        { label: "ReactJS", value: 1 },
                                        { label: "NodeJS", value: 2 },
                                        { label: "MongoDB", value: 3 },
                                        { label: "ExpressJS", value: 4 },
                                        { label: "JavaScript", value: 5 },
                                        { label: "HTML", value: 6 },
                                        { label: "CSS", value: 7 },
                                        { label: "SASS", value: 8 },
                                        { label: "LESS", value: 9 },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item name="thumbnail">
                                <Space
                                    direction="vertical"
                                    style={{ width: "100%" }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: 300,
                                            objectFit: "cover",
                                        }}
                                        src={thumbnail}
                                        alt="Avatar"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Thay đổi ảnh bài viết
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Modal
                    title="Chọn ảnh của bạn"
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setImageSelected(null);
                    }}
                    footer={null}
                    width={1000}
                    style={{ top: 20 }}
                >
                    <Flex justify="space-between" align="center">
                        <Space direction="horizontal">
                            <Upload
                                maxCount={1}
                                onChange={handleUploadImage}
                                showUploadList={false}
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "rgb(243, 156, 18)",
                                    }}
                                >
                                    Tải ảnh lên
                                </Button>
                            </Upload>

                            <Button
                                type="primary"
                                disabled={!imageSelected}
                                onClick={() => {
                                    setThumbnail(imageSelected);
                                    setIsModalOpen(false);
                                    form.setFieldsValue({
                                        thumbnail: imageSelected,
                                    });
                                }}
                            >
                                Chọn ảnh
                            </Button>
                        </Space>
                        <Button
                            type="primary"
                            disabled={!imageSelected}
                            danger
                            onClick={() => {
                                setImages(
                                    images.filter(
                                        (image) => image !== imageSelected
                                    )
                                );
                                setImageSelected(null);
                            }}
                        >
                            Xóa ảnh
                        </Button>
                    </Flex>

                    <div style={{ marginTop: "1rem" }}>
                        <Row gutter={[16, 16]} wrap={true}>
                            {images &&
                                images.map((image, index) => (
                                    <Col span={6} key={index}>
                                        <div
                                            className={
                                                imageSelected == image
                                                    ? "image-selected"
                                                    : ""
                                            }
                                            onClick={selecteImage(image)}
                                        >
                                            <img
                                                src={image}
                                                alt={`image-${index}`}
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default BlogDetail;
