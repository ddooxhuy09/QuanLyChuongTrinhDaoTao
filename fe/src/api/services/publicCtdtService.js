import apiClient from '../config/apiClient';

// Service cho public API chương trình đào tạo (không cần authentication)

export const fetchAllChuongTrinhDaoTaoPublic = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/public/chuongtrinhdaotao');

        // Kiểm tra response status
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', errorText);
            return {
                success: false,
                message: `Lỗi server (${response.status}): ${response.statusText}`
            };
        }

        // Kiểm tra content-type có phải JSON không
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Non-JSON response:', responseText);
            return {
                success: false,
                message: 'Server trả về dữ liệu không đúng định dạng JSON'
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chương trình đào tạo:', error);

        // Kiểm tra loại lỗi cụ thể
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return {
                success: false,
                message: 'Không thể kết nối đến server. Vui lòng kiểm tra xem backend server có đang chạy không.'
            };
        }

        if (error.message.includes('JSON')) {
            return {
                success: false,
                message: 'Server trả về dữ liệu không đúng định dạng. Có thể server đang gặp sự cố.'
            };
        }

        return {
            success: false,
            message: error.message || 'Lỗi mạng hoặc máy chủ.'
        };
    }
};

export const fetchChuongTrinhByMaPublic = async (maChuongTrinh) => {
    try {
        const response = await fetch(`http://localhost:3000/api/public/chuongtrinhdaotao/${maChuongTrinh}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', errorText);
            return {
                success: false,
                message: `Lỗi server (${response.status}): ${response.statusText}`
            };
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Non-JSON response:', responseText);
            return {
                success: false,
                message: 'Server trả về dữ liệu không đúng định dạng JSON'
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết chương trình đào tạo:', error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return {
                success: false,
                message: 'Không thể kết nối đến server. Vui lòng kiểm tra xem backend server có đang chạy không.'
            };
        }

        return {
            success: false,
            message: error.message || 'Lỗi mạng hoặc máy chủ.'
        };
    }
};

export const fetchChuyenNganhPublic = async (maChuongTrinh) => {
    try {
        const response = await fetch(`http://localhost:3000/api/public/chuongtrinhdaotao/${maChuongTrinh}/chuyennganh`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', errorText);
            return {
                success: false,
                message: `Lỗi server (${response.status}): ${response.statusText}`
            };
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Non-JSON response:', responseText);
            return {
                success: false,
                message: 'Server trả về dữ liệu không đúng định dạng JSON'
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chuyên ngành:', error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return {
                success: false,
                message: 'Không thể kết nối đến server. Vui lòng kiểm tra xem backend server có đang chạy không.'
            };
        }

        return {
            success: false,
            message: error.message || 'Lỗi mạng hoặc máy chủ.'
        };
    }
};

export const fetchMonTuChonPublic = async (maChuongTrinh, maKhoiKienThuc, hocKy) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/public/chuongtrinhdaotao/${maChuongTrinh}/montuchon?maKhoiKienThuc=${maKhoiKienThuc}&hocKy=${hocKy}`
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', errorText);
            return {
                success: false,
                message: `Lỗi server (${response.status}): ${response.statusText}`
            };
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Non-JSON response:', responseText);
            return {
                success: false,
                message: 'Server trả về dữ liệu không đúng định dạng JSON'
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách môn tự chọn:', error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return {
                success: false,
                message: 'Không thể kết nối đến server. Vui lòng kiểm tra xem backend server có đang chạy không.'
            };
        }

        return {
            success: false,
            message: error.message || 'Lỗi mạng hoặc máy chủ.'
        };
    }
}; 