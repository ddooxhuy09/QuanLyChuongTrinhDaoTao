USE [QLChuongTrinhDaoTao]
GO
/****** Object:  Table [dbo].[ChiTiet_CTDT]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTiet_CTDT](
	[MaChuongTrinh] [varchar](10) NOT NULL,
	[MaMonHoc] [varchar](15) NOT NULL,
	[KyHoc] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChuongTrinh] ASC,
	[MaMonHoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChuongTrinhDaoTao]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChuongTrinhDaoTao](
	[MaChuongTrinh] [varchar](10) NOT NULL,
	[TenChuongTrinh] [nvarchar](100) NOT NULL,
	[MaNganh] [varchar](10) NULL,
	[TrinhDoDaoTao] [nvarchar](50) NULL,
	[HinhThucDaoTao] [nvarchar](50) NULL,
	[NamApDung] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaChuongTrinh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GiangVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GiangVien](
	[MaGiangVien] [varchar](10) NOT NULL,
	[HoTen] [nvarchar](100) NOT NULL,
	[MaKhoa] [varchar](10) NOT NULL,
	[Email] [varchar](100) NULL,
	[NgaySinh] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[MaGiangVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GiangVien_MonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GiangVien_MonHoc](
	[MaGiangVien] [varchar](10) NOT NULL,
	[MaMonHoc] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaGiangVien] ASC,
	[MaMonHoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Khoa]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Khoa](
	[MaKhoa] [varchar](10) NOT NULL,
	[TenKhoa] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaKhoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhoiKienThuc](
	[MaKhoiKienThuc] [varchar](10) NOT NULL,
	[TenKhoiKienThuc] [nvarchar](100) NOT NULL,
	[ParentID] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaKhoiKienThuc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonHoc](
	[MaMonHoc] [varchar](15) NOT NULL,
	[TenMonHoc] [nvarchar](100) NOT NULL,
	[SoTinChi] [float] NOT NULL,
	[SoTietLiThuyet] [int] NULL,
	[SoTietBaiTap] [int] NULL,
	[SoTietThucHanh] [int] NULL,
	[SoTietTuHoc] [int] NULL,
	[NgonNguDay] [nvarchar](50) NULL,
	[LoaiMon] [nvarchar](50) NULL,
	[MaKhoiKienThuc] [varchar](10) NULL,
	[MaMonHocTruoc] [varchar](15) NULL,
	[MaMonHocTienQuyet] [varchar](15) NULL,
	[MaMonHocSongHanh] [varchar](15) NULL,
	[TenMonHocTiengAnh] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaMonHoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Nganh]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Nganh](
	[MaNganh] [varchar](10) NOT NULL,
	[MaKhoa] [varchar](10) NOT NULL,
	[TenNganh] [nvarchar](100) NOT NULL,
	[MoTa] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[MaNganh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SinhVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SinhVien](
	[MaSinhVien] [varchar](10) NOT NULL,
	[HoTen] [nvarchar](100) NOT NULL,
	[NgaySinh] [date] NULL,
	[NamNhapHoc] [int] NOT NULL,
	[Email] [varchar](100) NULL,
	[MaChuongTrinh] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MaSinhVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[ID] [varchar](10) NOT NULL,
	[TenDangNhap] [varchar](50) NOT NULL,
	[MatKhau] [nvarchar](100) NOT NULL,
	[Quyen] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'1', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'2', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'3', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'4', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'5', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'6', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1105', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1106', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1107', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1122', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1150', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1151', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1152', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1153', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1162_CLC', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1163_CLC', N'HK02')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1164_CLC', N'HK03')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1201_CLC', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1203_CLC', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1224_CLC', N'HK02')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS1269_CLC', N'HK03')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BAS12O4_CLC', N'HK02')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'BSA1221_CLC', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'ELE1309_CLC', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT11117_CLC', N'HK01')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1306_CLC', N'HK03')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1313_CLC', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT13145_CLC', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT13187_CLC', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1319_CLC', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1332_CLC', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1336_CLC', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1339_CLC', N'HK02')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1340_CLC', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1341_CLC', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1342_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1358_CLC', N'HK03')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1359_CLC', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1409_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14119_CLC', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14120_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14121_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14122_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14123_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14124_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14125_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14126_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14127_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14141_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14142_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14148_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14149_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14155_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14167_CLC', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14179_CLC', N'HK08')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1418_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14180_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14181_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14182_CLC', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14190_CLC', N'HK09')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT14191_CLC', N'HK09')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1434_CLC', N'HK06')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1449_CLC', N'HK07')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'INT1472_CLC', N'HK05')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'SKD1101', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'SKD1102', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'SKD1103', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7480201', N'SKD1108', N'HK04')
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7840202', N'BAS1105', NULL)
INSERT [dbo].[ChiTiet_CTDT] ([MaChuongTrinh], [MaMonHoc], [KyHoc]) VALUES (N'7840202', N'BAS1106', NULL)
GO
INSERT [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh], [TenChuongTrinh], [MaNganh], [TrinhDoDaoTao], [HinhThucDaoTao], [NamApDung]) VALUES (N'7480200', N'Công nghệ thông tin - Chất lượng cao', N'N001', N'Đại học', N'Chính quy', 2020)
INSERT [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh], [TenChuongTrinh], [MaNganh], [TrinhDoDaoTao], [HinhThucDaoTao], [NamApDung]) VALUES (N'7840201', N'Công nghệ thông tin', N'N001', N'Đại học', N'Chính quy', 2022)
INSERT [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh], [TenChuongTrinh], [MaNganh], [TrinhDoDaoTao], [HinhThucDaoTao], [NamApDung]) VALUES (N'7480201', N'Công nghệ thông tin - Chất lượng cao', N'N001', N'Đại học', N'Chính quy', 2022)
INSERT [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh], [TenChuongTrinh], [MaNganh], [TrinhDoDaoTao], [HinhThucDaoTao], [NamApDung]) VALUES (N'7840202', N'An toàn thông tin', N'N002', N'Đại học', N'Chính quy', NULL)
GO
INSERT [dbo].[GiangVien] ([MaGiangVien], [HoTen], [MaKhoa], [Email], [NgaySinh]) VALUES (N'GV001', N'Trí', N'K001', N'tri@gmail.com', CAST(N'2025-06-09' AS Date))
GO
INSERT [dbo].[GiangVien_MonHoc] ([MaGiangVien], [MaMonHoc]) VALUES (N'GV001', N'BAS1162_CLC')
INSERT [dbo].[GiangVien_MonHoc] ([MaGiangVien], [MaMonHoc]) VALUES (N'GV001', N'BAS1163_CLC')
INSERT [dbo].[GiangVien_MonHoc] ([MaGiangVien], [MaMonHoc]) VALUES (N'GV001', N'BAS1164_CLC')
GO
INSERT [dbo].[Khoa] ([MaKhoa], [TenKhoa]) VALUES (N'K001', N'Công nghệ thông tin')
GO
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT001', N'Kiến thức giáo dục đại cương (Foundation Knowledge)', NULL)
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT002', N'Kiến thức giáo dục chuyên nghiệp (Professional Educational Knowledge)', NULL)
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT003', N'Thực tập và tốt nghiệp (Internship and Thesis)', NULL)
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT004', N'Khối kiến thức chung (General Knowledge)', N'KKT001')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT005', N'Khối kiến thức khoa học tự nhiên và xã hội (Natural and Social Science Knowledge)', N'KKT001')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT006', N'Giáo dục thể chất và Giáo dục quốc phòng (Physical Education and National Defense Education)', N'KKT004')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT007', N'Kiến thức các môn kỹ năng (Knowledge of skill-based subjects)', N'KKT004')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT008', N'Lý luận chính trị (Political Theory)', N'KKT004')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT009', N'Tiếng Anh (English)', N'KKT004')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT010', N'Tin học (Basic Information Technology)', N'KKT004')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT011', N'Khối kiến thức cơ sở (Major Fundamental Knowledge)', N'KKT002')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT012', N'Khối kiến thức chuyên ngành (Professional Educational Knowledge)', N'KKT002')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT013', N'Chuyên ngành Trí tuệ nhân tạo (Artificial Intelligence)', N'KKT012')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT014', N'Chuyên ngành Hệ thống thông tin (Information Systems)', N'KKT012')
INSERT [dbo].[KhoiKienThuc] ([MaKhoiKienThuc], [TenKhoiKienThuc], [ParentID]) VALUES (N'KKT015', N'Chuyên ngành Công nghệ phần mềm (Software Engineering)', N'KKT012')
GO
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'1', N'Môn tự chọn 1', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT013', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'2', N'Môn tự chọn 2', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT013', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'3', N'Môn tự chọn 3', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT013', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'4', N'Môn tự chọn 1', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT014', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'5', N'Môn tự chọn 2', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT014', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'6', N'Môn tự chọn 3', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT014', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'7', N'Môn tự chọn 1', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT015', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'8', N'Môn tự chọn 2', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT015', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'9', N'Môn tự chọn 3', 3, NULL, NULL, NULL, NULL, NULL, NULL, N'KKT015', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1105', N'Giáo dục quốc phòng', 7.5, NULL, NULL, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT006', NULL, NULL, NULL, N'Military Education')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1106', N'Giáo dục thể chất 1', 2, 2, NULL, 26, 2, N'Tiếng Việt', N'Bắt buộc', N'KKT006', NULL, NULL, NULL, N'Physical Education 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1107', N'Giáo dục thể chất 2', 2, 2, NULL, 26, 2, N'Tiếng Việt', N'Bắt buộc', N'KKT006', NULL, NULL, NULL, N'Physical Education 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1122', N'Tư tưởng Hồ Chí Minh', 2, 24, 6, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT008', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1150', N'Triết học Mác-Lênin', 3, 34, 10, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT008', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1151', N'Kinh tế chính trị Mác-Lênin', 2, 24, 6, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT008', NULL, N'INT1339_CLC', NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1152', N'Chủ nghĩa xã hội khoa học', 2, 24, 6, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT008', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1153', N'Lịch sử đảng cộng sản Việt Nam', 2, 24, 6, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT008', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1162_CLC', N'Tiếng Anh (Course 1)_CLC', 8, NULL, NULL, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT009', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1163_CLC', N'Tiếng Anh (Course 2)_CLC', 8, NULL, NULL, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT009', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1164_CLC', N'Tiếng Anh (Course 3)_CLC', 8, NULL, NULL, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT009', NULL, NULL, NULL, NULL)
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1201_CLC', N'Đại số', 3, 36, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Algebra')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1203_CLC', N'Giải tích 1', 3, 36, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Calculus 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1224_CLC', N'Vật lý 1 và thí nghiệm', 4, 42, 6, 8, 4, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Physics 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS1269_CLC', N'Xác suất thống kê', 3, 36, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Probability and Statistics')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BAS12O4_CLC', N'Giải tích 2', 3, 36, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Calculus 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'BSA1221_CLC', N'Pháp luật đại cương', 2, 18, 6, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'General Law')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'ELE1309_CLC', N'Điện tử số', 3, 32, 8, 4, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, NULL, NULL, N'Digital Electronics')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT11117_CLC', N'Nhập môn tin học và lập trình', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT010', NULL, NULL, NULL, N'Introduction to Computing and Programming')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1306_CLC', N'Cấu trúc dữ liệu và giải thuật', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Data Structures and Algorithms')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1313_CLC', N'Cơ sở dữ liệu', 3, 32, 9, 4, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Databases')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT13145_CLC', N'Kiến trúc máy tính', 3, 30, 15, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Computer Architecture')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT13187_CLC', N'Thực tập cơ sở', 4, NULL, NULL, NULL, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1332_CLC', NULL, N'Internship')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1319_CLC', N'Hệ điều hành', 3, 34, 10, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Operating Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1332_CLC', N'Lập trình hướng đối tượng', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Object-Oriented Programming')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1336_CLC', N'Mạng máy tính', 3, 36, 5, 4, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Computer Networks')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1339_CLC', N'Ngôn ngữ lập trình C++', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', N'INT11117_CLC', NULL, NULL, N'Programming with C++')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1340_CLC', N'Nhập môn công nghệ phần mềm', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT011', N'INT1332_CLC', N'INT1339_CLC', NULL, N'Introduction to Software Engineering')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1341_CLC', N'Nhập môn trí tuệ nhân tạo', 3, 32, 12, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT011', N'INT1359_CLC', N'INT1339_CLC', NULL, N'Introduction to Artificial Intelligence')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1342_CLC', N'Phân tích và thiết kế hệ thống thông tin', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT011', N'INT1332_CLC', N'INT1339_CLC', NULL, N'Analysis and Design of Information Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1358_CLC', N'Toán rời rạc 1', 3, 36, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', N'INT11117_CLC', NULL, NULL, N'Discrete Mathematics 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1359_CLC', N'Toán rời rạc 2', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT011', N'INT11117_CLC', N'INT1339_CLC', NULL, N'Discrete Mathematics 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1408_CLC', N'Chuyên đề công nghệ phần mềm', 1, 6, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Advanced Topics in Software Engineering')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1409_CLC', N'Chuyên đề hệ thống thông tin', 1, 6, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT014', NULL, N'INT1339_CLC', NULL, N'Advanced Topics in Information Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14119_CLC', N'Lập trình Python', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Python Programming')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14120_CLC', N'Nhập môn Khoa học dữ liệu', 3, 32, 12, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Introduction to Data Science')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14121_CLC', N'Học máy', 3, 32, 12, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Machine Learning')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14122_CLC', N'Nhập môn học sâu', 3, 32, 8, 4, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Introduction to Deep Learning')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14123_CLC', N'Xử lý ảnh', 3, 32, 8, 4, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Image Processing')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14124_CLC', N'Xử lý ngôn ngữ tự nhiên', 3, 32, 12, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Natural Language Processing')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14125_CLC', N'Truy xuất thông tin', 3, 34, 10, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Information Retrieval')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14126_CLC', N'Khai phá dữ liệu lớn', 3, 32, 8, 4, 1, N'Tiếng Anh', N'Tự chọn', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Mining Massive Data Sets')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14127_CLC', N'Phân tích và khai phá dữ liệu văn bản', 3, 32, 12, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Text Mining and Analytics')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14139_CLC', N'Học phần thay thế tốt nghiệp 1 ngành CNPM', 4, 20, 40, NULL, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT015', NULL, NULL, NULL, N'Software Engineering Graduation Module 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14140_CLC', N'Học phần thay thế tốt nghiệp 2 ngành CNPM', 4, 20, 40, NULL, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT015', NULL, NULL, NULL, N'Software Engineering Graduation Module 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14141_CLC', N'Học phần thay thế tốt nghiệp 1 ngành TTNT', 4, 34, 26, NULL, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT013', NULL, NULL, NULL, N'Artificial Intelligence Graduation Module 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14142_CLC', N'Học phần thay thế tốt nghiệp 2 ngành TTNT', 4, 40, 16, 4, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT013', NULL, NULL, NULL, N'Artificial Intelligence Graduation Module 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14148_CLC', N'Cơ sở dữ liệu phân tán', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT014', NULL, N'INT1339_CLC', NULL, N'Distributed Database Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14149_CLC', N'IoT và ứng dụng', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT014', NULL, NULL, NULL, N'IoT and Applications')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14155_CLC', N'Khai phá dữ liệu', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT014', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Data Mining')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1416_CLC', N'Đảm bảo chất lượng phần mềm', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Software Quality Assurance')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14167_CLC', N'Hệ quản trị cơ sở dữ liệu', 3, 32, 4, 8, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT011', N'INT1313_CLC', NULL, NULL, N'Databases Management Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14178_CLC', N'Phân tích yêu cầu phần mềm', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Software Requirement Analysis')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14179_CLC', N'Chuyên đề trí tuệ nhân tạo', 1, 6, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT013', N'INT1341_CLC', N'INT1339_CLC', NULL, N'Advanced Topics in Artificial Intelligence')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1418_CLC', N'Hệ cơ sở dữ liệu đa phương tiện', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT014', NULL, N'INT1339_CLC', NULL, N'Multimedia Database Systems')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14180_CLC', N'Kho dữ liệu', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT014', NULL, N'INT1339_CLC', NULL, N'Data Warehousing')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14181_CLC', N'Quản lý nghiệp vụ thông minh', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT014', NULL, N'INT1339_CLC', NULL, N'Business Intelligence')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14182_CLC', N'Học phần thay thế tốt nghiệp 1 chuyên ngành HTTT', 4, 20, 40, NULL, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT014', NULL, NULL, NULL, N'Information System Graduation Module 1')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14183_CLC', N'Học phần thay thế tốt nghiệp 2 chuyên ngành HTTT', 4, 20, 40, NULL, NULL, N'Tiếng Anh', N'Thay thế tốt nghiệp', N'KKT014', NULL, NULL, NULL, N'Information System Graduation Module 2')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14190_CLC', N'Thực tập tốt nghiệp', 8, NULL, NULL, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT003', NULL, NULL, NULL, N'Graduation Internship')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT14191_CLC', N'Đồ án tốt nghiệp/Học phần thay thế tốt nghiệp', 8, NULL, NULL, NULL, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT003', NULL, NULL, NULL, N'Thesis/Graduation Module')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1427_CLC', N'Kiến trúc và thiết kế phần mềm', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Bắt buộc', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Software Architecture and Design')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1433_CLC', N'Lập trình mạng', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Tự chọn', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Network Programming')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1434_CLC', N'Lập trình web', 3, 30, 9, 6, NULL, N'Tiếng Anh', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Web Programming')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1448_CLC', N'Phát triển phần mềm hướng dịch vụ', 3, 36, 8, NULL, 1, N'Tiếng Anh', N'Tự chọn', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Service-Oriented Software Development')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1449_CLC', N'Phát triển ứng dụng cho các thiết bị di động', 3, 30, 8, 6, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT011', N'INT1332_CLC', N'INT1339_CLC', NULL, N'Mobile Application Development')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1463_CLC', N'Phát triển phần mềm an toàn', 3, 34, 6, 4, 1, N'Tiếng Anh', N'Tự chọn', N'KKT015', N'INT1340_CLC', N'INT1339_CLC', NULL, N'Secure Software Development')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'INT1472_CLC', N'Cơ sở an toàn thông tin', 3, 30, 8, 7, NULL, N'Tiếng Việt', N'Bắt buộc', N'KKT011', NULL, N'INT1339_CLC', NULL, N'Fundamentals of Information Security')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'SKD1101', N'Kỹ năng thuyết trình', 1, 6, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT007', NULL, NULL, NULL, N'Presentation skills')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'SKD1102', N'Kỹ năng làm việc nhóm', 1, 6, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT007', NULL, NULL, NULL, N'Teamwork skills')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'SKD1103', N'Kỹ năng tạo lập văn bản', 1, 6, 8, NULL, 1, N'Tiếng Việt', N'Bắt buộc', N'KKT007', NULL, NULL, NULL, N'Document-writing skills')
INSERT [dbo].[MonHoc] ([MaMonHoc], [TenMonHoc], [SoTinChi], [SoTietLiThuyet], [SoTietBaiTap], [SoTietThucHanh], [SoTietTuHoc], [NgonNguDay], [LoaiMon], [MaKhoiKienThuc], [MaMonHocTruoc], [MaMonHocTienQuyet], [MaMonHocSongHanh], [TenMonHocTiengAnh]) VALUES (N'SKD1108', N'Phương pháp luận nghiên cứu khoa học', 2, 18, 6, NULL, 6, N'Tiếng Việt', N'Bắt buộc', N'KKT005', NULL, NULL, NULL, N'Scientific Research Methodologies')
GO
INSERT [dbo].[Nganh] ([MaNganh], [MaKhoa], [TenNganh], [MoTa]) VALUES (N'N001', N'K001', N'Công nghệ thông tin', NULL)
INSERT [dbo].[Nganh] ([MaNganh], [MaKhoa], [TenNganh], [MoTa]) VALUES (N'N002', N'K001', N'An toàn thông tin', NULL)
GO
INSERT [dbo].[SinhVien] ([MaSinhVien], [HoTen], [NgaySinh], [NamNhapHoc], [Email], [MaChuongTrinh]) VALUES (N'N001202200', N'Đỗ Minh Bảo Huy', CAST(N'2004-09-26' AS Date), 2022, N'huy@gmail.com', N'7480201')
GO
INSERT [dbo].[User] ([ID], [TenDangNhap], [MatKhau], [Quyen]) VALUES (N'ADMIN001', N'admin', N'admin', N'Phòng đào tạo')
INSERT [dbo].[User] ([ID], [TenDangNhap], [MatKhau], [Quyen]) VALUES (N'GV001', N'GV001', N'06092025', N'Giảng Viên')
INSERT [dbo].[User] ([ID], [TenDangNhap], [MatKhau], [Quyen]) VALUES (N'N001202200', N'N001202200', N'123456789', N'Sinh viên')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_ChuongTrinhDaoTao]    Script Date: 6/24/2025 7:24:54 PM ******/
ALTER TABLE [dbo].[ChuongTrinhDaoTao] ADD  CONSTRAINT [UK_ChuongTrinhDaoTao] UNIQUE NONCLUSTERED 
(
	[TrinhDoDaoTao] ASC,
	[HinhThucDaoTao] ASC,
	[MaNganh] ASC,
	[NamApDung] ASC,
	[TenChuongTrinh] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_GiangVien_Email]    Script Date: 6/24/2025 7:24:54 PM ******/
ALTER TABLE [dbo].[GiangVien] ADD  CONSTRAINT [UK_GiangVien_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_SinhVien_Email]    Script Date: 6/24/2025 7:24:54 PM ******/
ALTER TABLE [dbo].[SinhVien] ADD  CONSTRAINT [UK_SinhVien_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_User_TenDangNhap]    Script Date: 6/24/2025 7:24:54 PM ******/
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [UK_User_TenDangNhap] UNIQUE NONCLUSTERED 
(
	[TenDangNhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ChiTiet_CTDT]  WITH CHECK ADD FOREIGN KEY([MaChuongTrinh])
REFERENCES [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh])
GO
ALTER TABLE [dbo].[ChiTiet_CTDT]  WITH CHECK ADD FOREIGN KEY([MaMonHoc])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[ChuongTrinhDaoTao]  WITH CHECK ADD FOREIGN KEY([MaNganh])
REFERENCES [dbo].[Nganh] ([MaNganh])
GO
ALTER TABLE [dbo].[GiangVien]  WITH CHECK ADD FOREIGN KEY([MaKhoa])
REFERENCES [dbo].[Khoa] ([MaKhoa])
GO
ALTER TABLE [dbo].[GiangVien_MonHoc]  WITH CHECK ADD FOREIGN KEY([MaGiangVien])
REFERENCES [dbo].[GiangVien] ([MaGiangVien])
GO
ALTER TABLE [dbo].[GiangVien_MonHoc]  WITH CHECK ADD FOREIGN KEY([MaMonHoc])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[KhoiKienThuc]  WITH CHECK ADD FOREIGN KEY([ParentID])
REFERENCES [dbo].[KhoiKienThuc] ([MaKhoiKienThuc])
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD FOREIGN KEY([MaKhoiKienThuc])
REFERENCES [dbo].[KhoiKienThuc] ([MaKhoiKienThuc])
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD FOREIGN KEY([MaMonHocTruoc])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD FOREIGN KEY([MaMonHocTienQuyet])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD FOREIGN KEY([MaMonHocSongHanh])
REFERENCES [dbo].[MonHoc] ([MaMonHoc])
GO
ALTER TABLE [dbo].[Nganh]  WITH CHECK ADD FOREIGN KEY([MaKhoa])
REFERENCES [dbo].[Khoa] ([MaKhoa])
GO
ALTER TABLE [dbo].[SinhVien]  WITH CHECK ADD  CONSTRAINT [FK_SinhVien_ChuongTrinh] FOREIGN KEY([MaChuongTrinh])
REFERENCES [dbo].[ChuongTrinhDaoTao] ([MaChuongTrinh])
GO
ALTER TABLE [dbo].[SinhVien] CHECK CONSTRAINT [FK_SinhVien_ChuongTrinh]
GO
ALTER TABLE [dbo].[MonHoc]  WITH CHECK ADD  CONSTRAINT [CHK_LoaiMon] CHECK  (([LoaiMon]=N'Thay thế tốt nghiệp' OR [LoaiMon]=N'Tự chọn' OR [LoaiMon]=N'Bắt buộc'))
GO
ALTER TABLE [dbo].[MonHoc] CHECK CONSTRAINT [CHK_LoaiMon]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [CHK_Quyen] CHECK  (([Quyen]=N'Sinh viên' OR [Quyen]=N'Giảng viên' OR [Quyen]=N'Phòng đào tạo'))
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [CHK_Quyen]
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatChuongTrinhDaoTao]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatChuongTrinhDaoTao]
    @MaChuongTrinh VARCHAR(10),
    @TenChuongTrinh NVARCHAR(100),
    @MaNganh VARCHAR(10),
    @TrinhDoDaoTao NVARCHAR(50),
    @HinhThucDaoTao NVARCHAR(50),
    @NamApDung INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE ChuongTrinhDaoTao
    SET
        TenChuongTrinh = @TenChuongTrinh,
        MaNganh = @MaNganh,
        TrinhDoDaoTao = @TrinhDoDaoTao,
        HinhThucDaoTao = @HinhThucDaoTao,
        NamApDung = @NamApDung
    WHERE MaChuongTrinh = @MaChuongTrinh;
    SELECT * FROM ChuongTrinhDaoTao WHERE MaChuongTrinh = @MaChuongTrinh;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatGiangVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatGiangVien]
    @MaGiangVien VARCHAR(10),
    @HoTen NVARCHAR(100) = NULL,
    @MaKhoa VARCHAR(10) = NULL,
    @Email VARCHAR(100) = NULL,
    @NgaySinh DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE GiangVien
    SET
        HoTen = COALESCE(@HoTen, HoTen),
        MaKhoa = COALESCE(@MaKhoa, MaKhoa),
        Email = COALESCE(@Email, Email),
        NgaySinh = COALESCE(@NgaySinh, NgaySinh)
    WHERE MaGiangVien = @MaGiangVien;

    SELECT * FROM GiangVien WHERE MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatHocKyMonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_CapNhatHocKyMonHoc]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15),
    @KyHocMoi NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE ChiTiet_CTDT
        SET KyHoc = @KyHocMoi
        WHERE MaChuongTrinh = @MaChuongTrinh 
        AND MaMonHoc = @MaMonHoc;

        -- Trả về thông tin đã cập nhật
        SELECT 
            ct.MaChuongTrinh,
            ct.MaMonHoc,
            mh.TenMonHoc,
            mh.SoTinChi,
            ct.KyHoc,
            mh.MaKhoiKienThuc,
            kkt.TenKhoiKienThuc,
            mh.MaMonHocTienQuyet,
            mhtq.TenMonHoc AS TenMonHocTienQuyet
        FROM ChiTiet_CTDT ct
        INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
        LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
        LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
        WHERE ct.MaChuongTrinh = @MaChuongTrinh 
        AND ct.MaMonHoc = @MaMonHoc
        OPTION (RECOMPILE, USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE'));
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatKhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10),
    @TenKhoiKienThuc NVARCHAR(100),
    @ParentID VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Kiểm tra mã khối kiến thức tồn tại
    IF NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Không tìm thấy khối kiến thức với mã %s.', 16, 1, @MaKhoiKienThuc);
        RETURN;
    END

    -- 2. Kiểm tra ParentID không phải chính nó
    IF @ParentID = @MaKhoiKienThuc
    BEGIN
        RAISERROR('ParentID không được trùng với chính mã khối kiến thức.', 16, 1);
        RETURN;
    END

    -- 3. Kiểm tra ParentID tồn tại nếu có
    IF @ParentID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @ParentID)
    BEGIN
        RAISERROR('ParentID với mã %s không tồn tại.', 16, 1, @ParentID);
        RETURN;
    END

    -- 4. Kiểm tra vòng lặp phân cấp
    IF @ParentID IS NOT NULL
    BEGIN
        -- Khởi tạo bảng biến để lưu cây phân cấp
        DECLARE @Hierarchy TABLE (
            MaKhoiKienThuc VARCHAR(10),
            ParentID VARCHAR(10)
        );

        -- Duyệt cây phân cấp từ ParentID
        WITH CTE_Hierarchy AS (
            SELECT MaKhoiKienThuc, ParentID
            FROM KhoiKienThuc
            WHERE MaKhoiKienThuc = @ParentID
            UNION ALL
            SELECT k.MaKhoiKienThuc, k.ParentID
            FROM KhoiKienThuc k
            INNER JOIN CTE_Hierarchy h ON k.MaKhoiKienThuc = h.ParentID
        )
        INSERT INTO @Hierarchy
        SELECT MaKhoiKienThuc, ParentID FROM CTE_Hierarchy;

        -- Nếu tìm thấy chính nó trong chuỗi phân cấp => vòng lặp
        IF EXISTS (SELECT 1 FROM @Hierarchy WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
        BEGIN
            RAISERROR('Không thể gán ParentID vì sẽ tạo vòng lặp phân cấp.', 16, 1);
            RETURN;
        END
    END

    -- 5. Cập nhật
    UPDATE KhoiKienThuc
    SET TenKhoiKienThuc = @TenKhoiKienThuc,
        ParentID = @ParentID
    WHERE MaKhoiKienThuc = @MaKhoiKienThuc;

    -- 6. Trả kết quả
    SELECT * FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatMonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CapNhatMonHoc]
    @MaMonHoc varchar(15),
    @TenMonHoc nvarchar(150) = NULL,
    @SoTinChi float = NULL,
    @SoTietLiThuyet int = NULL,
    @SoTietBaiTap int = NULL,
    @SoTietThucHanh int = NULL,
    @SoTietTuHoc int = NULL,
    @NgonNguDay nvarchar(50) = NULL,
    @LoaiMon nvarchar(50) = NULL,
    @MaKhoiKienThuc varchar(10) = NULL,
    @MaMonHocTruoc varchar(15) = NULL,
    @MaMonHocTienQuyet varchar(15) = NULL,
    @MaMonHocSongHanh varchar(15) = NULL,
    @TenMonHocTiengAnh nvarchar(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra môn học tồn tại
    IF NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHoc)
    BEGIN
        RAISERROR('Môn học với mã %s không tồn tại', 16, 1, @MaMonHoc);
        RETURN;
    END
    
    -- Kiểm tra khối kiến thức
    IF @MaKhoiKienThuc IS NOT NULL AND NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Khối kiến thức với mã %s không tồn tại', 16, 1, @MaKhoiKienThuc);
        RETURN;
    END
    
    -- Kiểm tra môn học trước
    IF @MaMonHocTruoc IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocTruoc)
    BEGIN
        RAISERROR('Môn học trước với mã %s không tồn tại', 16, 1, @MaMonHocTruoc);
        RETURN;
    END
    
    -- Kiểm tra môn học tiên quyết
    IF @MaMonHocTienQuyet IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocTienQuyet)
    BEGIN
        RAISERROR('Môn học tiên quyết với mã %s không tồn tại', 16, 1, @MaMonHocTienQuyet);
        RETURN;
    END
    
    -- Kiểm tra môn học song hành
    IF @MaMonHocSongHanh IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocSongHanh)
    BEGIN
        RAISERROR('Môn học song hành với mã %s không tồn tại', 16, 1, @MaMonHocSongHanh);
        RETURN;
    END
    
    -- Cập nhật môn học
    UPDATE MonHoc
    SET 
        TenMonHoc = ISNULL(@TenMonHoc, TenMonHoc),
        SoTinChi = ISNULL(@SoTinChi, SoTinChi),
        SoTietLiThuyet = ISNULL(@SoTietLiThuyet, SoTietLiThuyet),
        SoTietBaiTap = ISNULL(@SoTietBaiTap, SoTietBaiTap),
        SoTietThucHanh = ISNULL(@SoTietThucHanh, SoTietThucHanh),
        SoTietTuHoc = ISNULL(@SoTietTuHoc, SoTietTuHoc),
        NgonNguDay = ISNULL(@NgonNguDay, NgonNguDay),
        LoaiMon = ISNULL(@LoaiMon, LoaiMon),
        MaKhoiKienThuc = ISNULL(@MaKhoiKienThuc, MaKhoiKienThuc),
        MaMonHocTruoc = ISNULL(@MaMonHocTruoc, MaMonHocTruoc),
        MaMonHocTienQuyet = ISNULL(@MaMonHocTienQuyet, MaMonHocTienQuyet),
        MaMonHocSongHanh = ISNULL(@MaMonHocSongHanh, MaMonHocSongHanh),
        TenMonHocTiengAnh = ISNULL(@TenMonHocTiengAnh, TenMonHocTiengAnh)
    WHERE MaMonHoc = @MaMonHoc;
    
    -- Trả về môn học đã cập nhật với thông tin JOIN
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTruoc,
        mht.TenMonHoc AS TenMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mhsh.TenMonHoc AS TenMonHocSongHanh,
        mh.TenMonHocTiengAnh
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mht ON mh.MaMonHocTruoc = mht.MaMonHoc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    LEFT JOIN MonHoc mhsh ON mh.MaMonHocSongHanh = mhsh.MaMonHoc
    WHERE mh.MaMonHoc = @MaMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatMonHocChoGiangVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatMonHocChoGiangVien]
    @MaGiangVien VARCHAR(10),
    @DanhSachMaMonHoc NVARCHAR(MAX) -- Chuỗi các mã môn, phân cách bằng dấu phẩy
AS
BEGIN
    SET NOCOUNT ON;

    -- Xóa hết các môn cũ của giảng viên
    DELETE FROM GiangVien_MonHoc WHERE MaGiangVien = @MaGiangVien;

    -- Thêm lại các môn mới
    DECLARE @xml XML = N'<root><item>' + REPLACE(@DanhSachMaMonHoc, ',', '</item><item>') + '</item></root>';

    INSERT INTO GiangVien_MonHoc (MaGiangVien, MaMonHoc)
    SELECT @MaGiangVien, T.c.value('.', 'VARCHAR(15)')
    FROM @xml.nodes('/root/item') AS T(c)
    WHERE T.c.value('.', 'VARCHAR(15)') <> '';

    -- Trả về danh sách mới
    SELECT gvmh.MaGiangVien, gvmh.MaMonHoc
    FROM GiangVien_MonHoc gvmh
    WHERE gvmh.MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatMonHocKhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatMonHocKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10),
    @DanhSachMaMonHoc NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Cập nhật tất cả môn học thuộc khối kiến thức này thành NULL
    UPDATE MonHoc 
    SET MaKhoiKienThuc = NULL 
    WHERE MaKhoiKienThuc = @MaKhoiKienThuc;

    -- Nếu có danh sách môn học mới, cập nhật lại
    IF @DanhSachMaMonHoc IS NOT NULL AND LEN(@DanhSachMaMonHoc) > 0
    BEGIN
        DECLARE @xml XML = N'<root><item>' + REPLACE(@DanhSachMaMonHoc, ',', '</item><item>') + '</item></root>';

        UPDATE MonHoc
        SET MaKhoiKienThuc = @MaKhoiKienThuc
        WHERE MaMonHoc IN (
            SELECT T.c.value('.', 'VARCHAR(15)')
            FROM @xml.nodes('/root/item') AS T(c)
            WHERE T.c.value('.', 'VARCHAR(15)') <> ''
        );
    END

    -- Trả về danh sách môn học sau khi cập nhật
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    WHERE mh.MaKhoiKienThuc = @MaKhoiKienThuc
    ORDER BY mh.TenMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatMonHocTheoKhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatMonHocTheoKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10),
    @DanhSachMaMonHoc NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Cập nhật tất cả môn học thuộc khối kiến thức này thành NULL
    UPDATE MonHoc 
    SET MaKhoiKienThuc = NULL 
    WHERE MaKhoiKienThuc = @MaKhoiKienThuc;

    -- Nếu có danh sách môn học mới, cập nhật lại
    IF @DanhSachMaMonHoc IS NOT NULL AND LEN(@DanhSachMaMonHoc) > 0
    BEGIN
        DECLARE @xml XML = N'<root><item>' + REPLACE(@DanhSachMaMonHoc, ',', '</item><item>') + '</item></root>';

        UPDATE MonHoc
        SET MaKhoiKienThuc = @MaKhoiKienThuc
        WHERE MaMonHoc IN (
            SELECT T.c.value('.', 'VARCHAR(15)')
            FROM @xml.nodes('/root/item') AS T(c)
            WHERE T.c.value('.', 'VARCHAR(15)') <> ''
        );
    END

    -- Trả về danh sách môn học sau khi cập nhật
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    WHERE mh.MaKhoiKienThuc = @MaKhoiKienThuc
    ORDER BY mh.TenMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatNhieuMonHocTheoKhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatNhieuMonHocTheoKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10),
    @DanhSachMaMonHoc NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Cập nhật tất cả môn học thuộc khối kiến thức này thành NULL
    UPDATE MonHoc 
    SET MaKhoiKienThuc = NULL 
    WHERE MaKhoiKienThuc = @MaKhoiKienThuc;

    -- Nếu có danh sách môn học mới, cập nhật lại
    IF @DanhSachMaMonHoc IS NOT NULL AND LEN(@DanhSachMaMonHoc) > 0
    BEGIN
        DECLARE @xml XML = N'<root><item>' + REPLACE(@DanhSachMaMonHoc, ',', '</item><item>') + '</item></root>';

        UPDATE MonHoc
        SET MaKhoiKienThuc = @MaKhoiKienThuc
        WHERE MaMonHoc IN (
            SELECT T.c.value('.', 'VARCHAR(15)')
            FROM @xml.nodes('/root/item') AS T(c)
            WHERE T.c.value('.', 'VARCHAR(15)') <> ''
        );
    END

    -- Trả về danh sách môn học sau khi cập nhật
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    WHERE mh.MaKhoiKienThuc = @MaKhoiKienThuc
    ORDER BY mh.TenMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CapNhatSinhVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CapNhatSinhVien]
    @MaSinhVien VARCHAR(10),
    @HoTen NVARCHAR(100) = NULL,
    @NgaySinh DATE = NULL,
    @MaChuongTrinh VARCHAR(10) = NULL, -- Thay đổi
    @NamNhapHoc INT = NULL,
    @Email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE SinhVien
    SET
        HoTen = COALESCE(@HoTen, HoTen),
        NgaySinh = COALESCE(@NgaySinh, NgaySinh),
        MaChuongTrinh = COALESCE(@MaChuongTrinh, MaChuongTrinh), -- Thay đổi
        NamNhapHoc = COALESCE(@NamNhapHoc, NamNhapHoc),
        Email = COALESCE(@Email, Email)
    WHERE MaSinhVien = @MaSinhVien;
    SELECT * FROM SinhVien WHERE MaSinhVien = @MaSinhVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CheckMonSau]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_CheckMonSau]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT ct.KyHoc, mh.TenMonHoc
        FROM ChiTiet_CTDT ct
        INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
        WHERE ct.MaChuongTrinh = @MaChuongTrinh 
        AND mh.MaMonHocTienQuyet = @MaMonHoc
        OPTION (RECOMPILE, USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE'));
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_CheckMonTienQuyetHocKy]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CheckMonTienQuyetHocKy]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Kiểm tra xem môn học có phải là môn tiên quyết của môn học khác trong CTDT không
        SELECT DISTINCT
            mh.MaMonHoc,
            mh.TenMonHoc,
            ct.KyHoc
        FROM ChiTiet_CTDT ct
        INNER JOIN MonHoc mh ON mh.MaMonHoc = ct.MaMonHoc
        WHERE ct.MaChuongTrinh = @MaChuongTrinh
        AND mh.MaMonHocTienQuyet = @MaMonHoc;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CheckPermission]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure để kiểm tra quyền
CREATE PROCEDURE [dbo].[SP_CheckPermission]
    @ID varchar(10),
    @RequiredRole nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserRole nvarchar(50);

    -- Lấy quyền của người dùng
    SELECT @UserRole = Quyen 
    FROM [dbo].[User] 
    WHERE ID = @ID;

    -- Kiểm tra quyền
    IF @UserRole = 'PHONGDAOTAO' -- PHONGDAOTAO có full quyền
        SELECT 1 AS HasPermission;
    ELSE IF @UserRole = @RequiredRole -- Kiểm tra quyền cụ thể
        SELECT 1 AS HasPermission;
    ELSE
        SELECT 0 AS HasPermission;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetChuyenNganhByMaCT]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetChuyenNganhByMaCT]
    @MaChuongTrinh VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin chuyên ngành và môn học theo học kỳ
    WITH ChuyenNganhInfo AS (
        -- Lấy thông tin chuyên ngành (các khối kiến thức có ParentID = 'KKT012')
        SELECT DISTINCT 
            kkt.MaKhoiKienThuc,
            kkt.TenKhoiKienThuc,
            kkt.ParentID
        FROM ChiTiet_CTDT ctdt
        INNER JOIN MonHoc mh ON ctdt.MaMonHoc = mh.MaMonHoc
        INNER JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
        WHERE ctdt.MaChuongTrinh = @MaChuongTrinh
        AND kkt.ParentID = 'KKT012'
    ),
    HocKyMonHoc AS (
        -- Lấy danh sách học kỳ và môn học cho mỗi chuyên ngành
        SELECT 
            cn.MaKhoiKienThuc,
            cn.ParentID,
            ctdt.KyHoc,
            JSON_QUERY((
                SELECT 
                    mh.MaMonHoc as maMonHoc,
                    mh.TenMonHoc as tenMonHoc,
                    mh.SoTinChi as soTinChi,
                    mh.SoTietLiThuyet as soTietLiThuyet,
                    mh.SoTietBaiTap as soTietBaiTap,
                    mh.SoTietThucHanh as soTietThucHanh,
                    mh.SoTietTuHoc as soTietTuHoc,
                    mh.NgonNguDay as ngonNguDay,
                    mh.LoaiMon as loaiMon,
                    kkt2.MaKhoiKienThuc as maKhoiKienThuc,
                    kkt2.TenKhoiKienThuc as tenKhoiKienThuc,
                    mh.MaMonHocTruoc as maMonHocTruoc,
                    mh.MaMonHocTienQuyet as maMonHocTienQuyet,
                    mh.MaMonHocSongHanh as maMonHocSongHanh,
                    mh.TenMonHocTiengAnh as tenMonHocTiengAnh
                FROM ChiTiet_CTDT ctdt2
                INNER JOIN MonHoc mh ON ctdt2.MaMonHoc = mh.MaMonHoc
                INNER JOIN KhoiKienThuc kkt2 ON mh.MaKhoiKienThuc = kkt2.MaKhoiKienThuc
                WHERE ctdt2.MaChuongTrinh = @MaChuongTrinh
                AND ctdt2.KyHoc = ctdt.KyHoc
                AND (
                    -- Lấy môn học thuộc chuyên ngành hiện tại
                    kkt2.MaKhoiKienThuc = cn.MaKhoiKienThuc
                    OR 
                    -- Lấy môn học có ParentID = null hoặc khác với ParentID của chuyên ngành
                    (kkt2.ParentID IS NULL OR (kkt2.ParentID != cn.ParentID AND kkt2.MaKhoiKienThuc != cn.MaKhoiKienThuc))
                )
                FOR JSON PATH
            )) as monHoc
        FROM ChuyenNganhInfo cn
        CROSS JOIN ChiTiet_CTDT ctdt
        WHERE ctdt.MaChuongTrinh = @MaChuongTrinh
        GROUP BY cn.MaKhoiKienThuc, cn.ParentID, ctdt.KyHoc
    )
    SELECT 
        cn.MaKhoiKienThuc,
        cn.TenKhoiKienThuc,
        (
            SELECT 
                hk.KyHoc as hocKy,
                hk.monHoc
            FROM HocKyMonHoc hk
            WHERE hk.MaKhoiKienThuc = cn.MaKhoiKienThuc
            AND hk.monHoc IS NOT NULL
            AND JSON_QUERY(hk.monHoc) != '[]'
            ORDER BY 
                CAST(SUBSTRING(hk.KyHoc, 3, 2) AS INT) -- Sắp xếp theo số học kỳ
            FOR JSON PATH
        ) as keHoachHocTap
    FROM ChuyenNganhInfo cn
    ORDER BY cn.MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetDanhSachChuongTrinhDaoTao]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GetDanhSachChuongTrinhDaoTao]
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            MaChuongTrinh,
            TenChuongTrinh,
            MaNganh,
            TrinhDoDaoTao,
            HinhThucDaoTao,
            NamApDung
        FROM ChuongTrinhDaoTao
        ORDER BY NamApDung DESC, MaChuongTrinh ASC;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetDanhSachKhoa]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetDanhSachKhoa]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        MaKhoa, 
        TenKhoa
    FROM Khoa
    ORDER BY MaKhoa;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetDanhSachMonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetDanhSachMonHoc]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTruoc,
        mht.TenMonHoc AS TenMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mhsh.TenMonHoc AS TenMonHocSongHanh,
        mh.TenMonHocTiengAnh
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mht ON mh.MaMonHocTruoc = mht.MaMonHoc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    LEFT JOIN MonHoc mhsh ON mh.MaMonHocSongHanh = mhsh.MaMonHoc
    ORDER BY mh.MaMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetDanhSachMonTuChon]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetDanhSachMonTuChon]
    @MaChuongTrinh VARCHAR(10),
    @MaKhoiKienThuc VARCHAR(10),
    @HocKy VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Tối ưu: lọc dữ liệu từng bảng trước (chiếu + chọn), rồi mới JOIN
    ;WITH MonHocLoc AS (
        SELECT 
            MaMonHoc,
            TenMonHoc,
            SoTinChi,
            SoTietLiThuyet,
            SoTietBaiTap,
            SoTietThucHanh,
            SoTietTuHoc,
            NgonNguDay,
            LoaiMon,
            MaKhoiKienThuc,
            MaMonHocTruoc,
            MaMonHocTienQuyet,
            MaMonHocSongHanh,
            TenMonHocTiengAnh
        FROM MonHoc WITH (INDEX=IX_MaKhoiKienThuc) -- nếu có index phù hợp
        WHERE MaKhoiKienThuc = @MaKhoiKienThuc AND LoaiMon = N'Tự chọn'
    ),
    CTDTLoc AS (
        SELECT MaMonHoc, KyHoc
        FROM ChiTiet_CTDT
        WHERE MaChuongTrinh = @MaChuongTrinh AND KyHoc = @HocKy
    )
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        mh.MaMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mh.TenMonHocTiengAnh,
        ct.KyHoc
    FROM MonHocLoc mh
    INNER JOIN CTDTLoc ct ON mh.MaMonHoc = ct.MaMonHoc
    ORDER BY mh.MaMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetDanhSachNganh]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetDanhSachNganh]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        ng.MaNganh,
        ng.TenNganh,
        ng.MaKhoa,
        k.TenKhoa,
        ng.MoTa,
        (SELECT COUNT(*) FROM ChuongTrinhDaoTao ct WHERE ct.MaNganh = ng.MaNganh) AS SoChuongTrinh
    FROM Nganh ng
    INNER JOIN Khoa k ON ng.MaKhoa = k.MaKhoa
    ORDER BY ng.TenNganh;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetKhoiKienThucChuyenNganh]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetKhoiKienThucChuyenNganh]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        kkt.MaKhoiKienThuc, 
        kkt.TenKhoiKienThuc, 
        kkt.ParentID,
        ISNULL(SUM(mh.SoTinChi), 0) AS TongSoTinChi
    FROM KhoiKienThuc kkt
    LEFT JOIN MonHoc mh ON kkt.MaKhoiKienThuc = mh.MaKhoiKienThuc
    WHERE kkt.ParentID = 'KKT012'
    GROUP BY kkt.MaKhoiKienThuc, kkt.TenKhoiKienThuc, kkt.ParentID
    ORDER BY kkt.MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetKhoiKienThucHierarchy]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetKhoiKienThucHierarchy]
AS
BEGIN
    SET NOCOUNT ON;
    
    WITH KhoiKienThucHierarchy AS (
        -- Lấy tất cả các khối kiến thức cha (ParentID IS NULL)
        SELECT 
            MaKhoiKienThuc, 
            TenKhoiKienThuc, 
            ParentID,
            0 AS Level
        FROM KhoiKienThuc
        WHERE ParentID IS NULL
        
        UNION ALL
        
        -- Lấy tất cả các khối kiến thức con
        SELECT 
            kkt.MaKhoiKienThuc, 
            kkt.TenKhoiKienThuc, 
            kkt.ParentID,
            h.Level + 1
        FROM KhoiKienThuc kkt
        INNER JOIN KhoiKienThucHierarchy h ON kkt.ParentID = h.MaKhoiKienThuc
    )
    
    -- Lấy kết quả cuối cùng với tổng số tín chỉ trực tiếp cho mỗi khối kiến thức
    -- (chỉ bao gồm môn học trực tiếp thuộc khối kiến thức đó)
    SELECT 
        h.MaKhoiKienThuc, 
        h.TenKhoiKienThuc, 
        h.ParentID,
        h.Level,
        ISNULL(SUM(mh.SoTinChi), 0) AS TongSoTinChi
    FROM KhoiKienThucHierarchy h
    LEFT JOIN MonHoc mh ON h.MaKhoiKienThuc = mh.MaKhoiKienThuc
    GROUP BY h.MaKhoiKienThuc, h.TenKhoiKienThuc, h.ParentID, h.Level
    ORDER BY h.Level, h.MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMonHocByKhoiKienThuc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetMonHocByKhoiKienThuc]
    @MaKhoiKienThuc varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Lấy danh sách môn học thuộc khối kiến thức này
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTruoc,
        mhtruoc.TenMonHoc AS TenMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mhsh.TenMonHoc AS TenMonHocSongHanh,
        mh.TenMonHocTiengAnh
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mhtruoc ON mh.MaMonHocTruoc = mhtruoc.MaMonHoc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    LEFT JOIN MonHoc mhsh ON mh.MaMonHocSongHanh = mhsh.MaMonHoc
    WHERE mh.MaKhoiKienThuc = @MaKhoiKienThuc
    ORDER BY mh.TenMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMonHocByMa]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetMonHocByMa]
    @MaMonHoc varchar(15)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTruoc,
        mht.TenMonHoc AS TenMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mhsh.TenMonHoc AS TenMonHocSongHanh,
        mh.TenMonHocTiengAnh
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mht ON mh.MaMonHocTruoc = mht.MaMonHoc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    LEFT JOIN MonHoc mhsh ON mh.MaMonHocSongHanh = mhsh.MaMonHoc
    WHERE mh.MaMonHoc = @MaMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetThongTinMonHoc]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GetThongTinMonHoc]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            ct.KyHoc, 
            mh.TenMonHoc,
            mh.MaMonHocTienQuyet,
            mhtq.TenMonHoc as TenMonHocTienQuyet
        FROM ChiTiet_CTDT ct
        INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
        LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
        WHERE ct.MaChuongTrinh = @MaChuongTrinh 
        AND ct.MaMonHoc = @MaMonHoc
        OPTION (RECOMPILE, USE HINT('ENABLE_PARALLEL_PLAN_PREFERENCE'));
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetToanBoChuongTrinhDaoTaoByMaCT]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetToanBoChuongTrinhDaoTaoByMaCT]
    @MaChuongTrinh varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra chương trình đào tạo tồn tại
    IF NOT EXISTS (SELECT 1 FROM ChuongTrinhDaoTao WHERE MaChuongTrinh = @MaChuongTrinh)
    BEGIN
        RAISERROR(N'Không tìm thấy chương trình đào tạo có mã %s', 16, 1, @MaChuongTrinh);
        RETURN;
    END
    
    -- Trả về thông tin chương trình đào tạo
    SELECT * FROM ChuongTrinhDaoTao WHERE MaChuongTrinh = @MaChuongTrinh;
    
    -- Lấy danh sách tất cả các khối kiến thức
    SELECT 
        kkt.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        kkt.ParentID,
        pkkt.TenKhoiKienThuc as TenKhoiKienThucCha
    FROM KhoiKienThuc kkt
    LEFT JOIN KhoiKienThuc pkkt ON kkt.ParentID = pkkt.MaKhoiKienThuc
    ORDER BY 
        CASE 
            WHEN kkt.ParentID IS NULL THEN 0 
            ELSE 1 
        END,
        kkt.MaKhoiKienThuc;
    
    -- Lấy chi tiết môn học cho từng học kỳ theo thứ tự
    SELECT 
        ct.KyHoc,
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        kkt.ParentID,
        pkkt.TenKhoiKienThuc as TenKhoiKienThucCha,
        mh.MaMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mh.TenMonHocTiengAnh,
        CASE 
            WHEN ct.KyHoc LIKE 'HK7-%' THEN SUBSTRING(ct.KyHoc, 5, LEN(ct.KyHoc))
            WHEN ct.KyHoc LIKE 'HK8-%' THEN SUBSTRING(ct.KyHoc, 5, LEN(ct.KyHoc))
            ELSE NULL
        END AS MaChuyenNganh
    FROM ChiTiet_CTDT ct
    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN KhoiKienThuc pkkt ON kkt.ParentID = pkkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    WHERE ct.MaChuongTrinh = @MaChuongTrinh
    ORDER BY 
        CASE 
            WHEN ct.KyHoc = 'HK9' THEN 9
            WHEN ct.KyHoc LIKE 'HK7-%' THEN 7
            WHEN ct.KyHoc LIKE 'HK8-%' THEN 8
            ELSE CAST(SUBSTRING(ct.KyHoc, 3, 1) AS INT)
        END,
        ct.KyHoc,
        mh.TenMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayChuongTrinhDaoTaoCuaSinhVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[SP_LayChuongTrinhDaoTaoCuaSinhVien]
    @MaSinhVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        sv.MaSinhVien,
        sv.HoTen,
        sv.NgaySinh,
        sv.NamNhapHoc,
        sv.Email,
        ctdt.MaChuongTrinh,
        ctdt.TenChuongTrinh,
        ctdt.MaNganh,
        ctdt.TrinhDoDaoTao,
        ctdt.HinhThucDaoTao,
        ctdt.NamApDung,
        n.TenNganh,
        k.TenKhoa
    FROM SinhVien sv
    INNER JOIN ChuongTrinhDaoTao ctdt ON sv.MaChuongTrinh = ctdt.MaChuongTrinh
    LEFT JOIN Nganh n ON ctdt.MaNganh = n.MaNganh
    LEFT JOIN Khoa k ON n.MaKhoa = k.MaKhoa
    WHERE sv.MaSinhVien = @MaSinhVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayDanhSachGiangVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LayDanhSachGiangVien]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        gv.MaGiangVien,
        gv.HoTen,
        gv.Email,
        gv.NgaySinh,
        gv.MaKhoa,
        k.TenKhoa,
        (SELECT COUNT(*) FROM GiangVien_MonHoc gvmh WHERE gvmh.MaGiangVien = gv.MaGiangVien) AS SoMonDangDay
    FROM GiangVien gv
    LEFT JOIN Khoa k ON gv.MaKhoa = k.MaKhoa;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayDanhSachPhongDaoTao]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LayDanhSachPhongDaoTao]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT ID, TenDangNhap, Quyen
    FROM [User]
    WHERE Quyen = N'Phòng đào tạo';
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayDanhSachSinhVien]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LayDanhSachSinhVien]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        sv.MaSinhVien,
        sv.HoTen,
        sv.Email,
        sv.NgaySinh,
        sv.MaChuongTrinh, -- Thay đổi
        ctdt.TenChuongTrinh, -- Lấy tên chương trình thay vì tên ngành
        n.TenNganh,
        n.MaKhoa,
        k.TenKhoa,
        sv.NamNhapHoc AS NienKhoa
    FROM SinhVien sv
    LEFT JOIN ChuongTrinhDaoTao ctdt ON sv.MaChuongTrinh = ctdt.MaChuongTrinh -- Thay đổi
    LEFT JOIN Nganh n ON ctdt.MaNganh = n.MaNganh -- Thay đổi
    LEFT JOIN Khoa k ON n.MaKhoa = k.MaKhoa;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayGiangVienTheoMa]    Script Date: 6/24/2025 7:24:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored procedure lấy đầy đủ thông tin giảng viên theo mã
CREATE PROCEDURE [dbo].[SP_LayGiangVienTheoMa]
    @MaGiangVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        g.MaGiangVien,
        g.HoTen,
        g.NgaySinh,
        g.MaKhoa,
        g.Email,
        k.TenKhoa,
        u.TenDangNhap,
        'GIANGVIEN' AS Role
    FROM GiangVien g
    LEFT JOIN Khoa k ON g.MaKhoa = k.MaKhoa
    LEFT JOIN [User] u ON u.TenDangNhap = g.MaGiangVien  -- Giả sử TenDangNhap = MaGiangVien
    WHERE g.MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayMonHocTheoGiangVien]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LayMonHocTheoGiangVien]
    @MaGiangVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT gvmh.MaGiangVien, gvmh.MaMonHoc, mh.TenMonHoc
    FROM GiangVien_MonHoc gvmh
    LEFT JOIN MonHoc mh ON gvmh.MaMonHoc = mh.MaMonHoc
    WHERE gvmh.MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LaySinhVienTheoMa]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LaySinhVienTheoMa]
    @MaSinhVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        s.MaSinhVien,
        s.HoTen,
        s.NgaySinh,
        s.MaChuongTrinh, -- Thay đổi
        s.NamNhapHoc,
        s.Email,
        ctdt.TenChuongTrinh, -- Lấy tên chương trình
        n.TenNganh,
        u.TenDangNhap,
        'SINHVIEN' AS Role
    FROM SinhVien s
    LEFT JOIN ChuongTrinhDaoTao ctdt ON s.MaChuongTrinh = ctdt.MaChuongTrinh -- Thay đổi
    LEFT JOIN Nganh n ON ctdt.MaNganh = n.MaNganh -- Thay đổi
    LEFT JOIN [User] u ON u.TenDangNhap = s.MaSinhVien
    WHERE s.MaSinhVien = @MaSinhVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LayThongTinSaoLuu]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SP_LayThongTinSaoLuu]
    @database_name NVARCHAR(128) -- Loại bỏ giá trị mặc định 'QLVT'
AS
BEGIN
    SET NOCOUNT ON; -- Giảm chi phí truyền thông tin trạng thái

    -- Kiểm tra xem có bản sao lưu nào cho database_name hay không
    IF NOT EXISTS (
        SELECT 1 
        FROM msdb.dbo.backupset WITH (FORCESEEK)
        WHERE database_name = @database_name AND type = 'D'
    )
    BEGIN
        SELECT 
            position = CAST(NULL AS INT),
            backup_start_date = CAST(NULL AS DATETIME),
            user_name = CAST(NULL AS NVARCHAR(128)),
            DienGiai = CAST('Không tìm thấy bản sao lưu cho cơ sở dữ liệu ' + @database_name AS NVARCHAR(256))
        RETURN;
    END

    -- Truy vấn thông tin sao lưu với tối ưu hóa
    ;WITH LatestBackup AS (	
        -- Lấy backup_set_id mới nhất với position = 1
        SELECT TOP 1 backup_set_id
        FROM msdb.dbo.backupset WITH (FORCESEEK)
        WHERE database_name = @database_name 
        AND position = 1
        ORDER BY backup_start_date DESC
    )
    SELECT 
        bs.position,
        bs.backup_start_date,
        bs.user_name,
        DienGiai = CAST('Sao lưu cơ sở dữ liệu ' + @database_name + ' vào thời điểm ' + 
            CONVERT(NVARCHAR(50), bs.backup_start_date, 120) AS NVARCHAR(256))
    FROM msdb.dbo.backupset bs
    INNER JOIN LatestBackup lb ON bs.backup_set_id >= lb.backup_set_id
    WHERE bs.database_name = @database_name 
    AND bs.type = 'D'
    ORDER BY bs.position DESC
    OPTION (OPTIMIZE FOR UNKNOWN); -- Loại bỏ OPTIMIZE FOR cụ thể để tăng tính linh hoạt
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_Login]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Login]
    @TenDangNhap varchar(50),
    @MatKhau nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        u.ID, 
        u.TenDangNhap, 
        u.Quyen AS Role, 
        COALESCE(sv.HoTen, gv.HoTen) AS HoTen,
        sv.MaChuongTrinh, -- Thay đổi
        ctdt.TenChuongTrinh, -- Lấy tên chương trình
        ng.TenNganh,
        gv.MaKhoa, 
        k.TenKhoa
    FROM [dbo].[User] u
    LEFT JOIN [dbo].[SinhVien] sv ON u.ID = sv.MaSinhVien
    LEFT JOIN [dbo].[ChuongTrinhDaoTao] ctdt ON sv.MaChuongTrinh = ctdt.MaChuongTrinh -- Thay đổi
    LEFT JOIN [dbo].[Nganh] ng ON ctdt.MaNganh = ng.MaNganh -- Thay đổi
    LEFT JOIN [dbo].[GiangVien] gv ON u.ID = gv.MaGiangVien
    LEFT JOIN [dbo].[Khoa] k ON gv.MaKhoa = k.MaKhoa
    WHERE u.TenDangNhap = @TenDangNhap 
        AND u.MatKhau = @MatKhau;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_TaoBackupDevice]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_TaoBackupDevice]
    @logicalName NVARCHAR(128),
    @physicalPath NVARCHAR(260),
    @deviceExists BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra tham số physicalPath không rỗng
        IF NULLIF(@physicalPath, '') IS NULL
        BEGIN
            RAISERROR (N'Đường dẫn vật lý không được để trống.', 16, 1);
            RETURN;
        END

        SET @deviceExists = 0;

        IF EXISTS (SELECT 1 FROM master.sys.backup_devices WHERE name = @logicalName)
        BEGIN
            SET @deviceExists = 1;
            EXEC master.sys.sp_dropdevice @logicalname = @logicalName, @delfile = 'delfile';
        END

        EXEC master.sys.sp_addumpdevice 'disk', @logicalName, @physicalPath;
        SELECT 'Tạo backup device thành công!' AS Result;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemChuongTrinhDaoTao]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemChuongTrinhDaoTao]
    @MaChuongTrinh VARCHAR(10),
    @TenChuongTrinh NVARCHAR(100),
    @MaNganh VARCHAR(10),
    @TrinhDoDaoTao NVARCHAR(50),
    @HinhThucDaoTao NVARCHAR(50),
    @NamApDung INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO ChuongTrinhDaoTao (MaChuongTrinh, TenChuongTrinh, MaNganh, TrinhDoDaoTao, HinhThucDaoTao, NamApDung)
    VALUES (@MaChuongTrinh, @TenChuongTrinh, @MaNganh, @TrinhDoDaoTao, @HinhThucDaoTao, @NamApDung);
    SELECT * FROM ChuongTrinhDaoTao WHERE MaChuongTrinh = @MaChuongTrinh;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemGiangVien]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemGiangVien]
    @MaGiangVien VARCHAR(10),
    @HoTen NVARCHAR(100),
    @MaKhoa VARCHAR(10),
    @Email VARCHAR(100),
    @NgaySinh DATE,
    @TenDangNhap VARCHAR(50),
    @MatKhau NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check trùng mã ở GiangVien, SinhVien, User
    IF EXISTS (SELECT 1 FROM GiangVien WHERE MaGiangVien = @MaGiangVien)
        OR EXISTS (SELECT 1 FROM SinhVien WHERE MaSinhVien = @MaGiangVien)
        OR EXISTS (SELECT 1 FROM [User] WHERE ID = @MaGiangVien)
    BEGIN
        RAISERROR(N'Mã giảng viên đã tồn tại ở hệ thống', 16, 1);
        RETURN;
    END

    -- Check trùng email ở GiangVien, SinhVien
    IF EXISTS (SELECT 1 FROM GiangVien WHERE Email = @Email)
        OR EXISTS (SELECT 1 FROM SinhVien WHERE Email = @Email)
    BEGIN
        RAISERROR(N'Email đã tồn tại ở hệ thống', 16, 1);
        RETURN;
    END

    -- Check trùng tên đăng nhập ở User
    IF EXISTS (SELECT 1 FROM [User] WHERE TenDangNhap = @TenDangNhap)
    BEGIN
        RAISERROR(N'Tên đăng nhập đã tồn tại', 16, 1);
        RETURN;
    END

    -- Thêm vào bảng GiangVien
    INSERT INTO GiangVien (MaGiangVien, HoTen, MaKhoa, Email, NgaySinh)
    VALUES (@MaGiangVien, @HoTen, @MaKhoa, @Email, @NgaySinh);

    -- Thêm vào bảng User
    INSERT INTO [User] (ID, TenDangNhap, MatKhau, Quyen)
    VALUES (@MaGiangVien, @TenDangNhap, @MatKhau, N'Giảng Viên');

    -- Trả về thông tin vừa thêm
    SELECT * FROM GiangVien WHERE MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemKhoiKienThuc]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10),
    @TenKhoiKienThuc NVARCHAR(100),
    @ParentID VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra mã đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Khối kiến thức với mã %s đã tồn tại.', 16, 1, @MaKhoiKienThuc);
        RETURN;
    END

    -- Kiểm tra ParentID (nếu có)
    IF @ParentID IS NOT NULL AND NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @ParentID)
    BEGIN
        RAISERROR('ParentID với mã %s không tồn tại.', 16, 1, @ParentID);
        RETURN;
    END

    -- Thêm mới
    INSERT INTO KhoiKienThuc (MaKhoiKienThuc, TenKhoiKienThuc, ParentID)
    VALUES (@MaKhoiKienThuc, @TenKhoiKienThuc, @ParentID);

    -- Trả kết quả
    SELECT * FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemMonHoc]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ThemMonHoc]
    @MaMonHoc varchar(15),
    @TenMonHoc nvarchar(150),
    @SoTinChi float,
    @SoTietLiThuyet int = NULL,
    @SoTietBaiTap int = NULL,
    @SoTietThucHanh int = NULL,
    @SoTietTuHoc int = NULL,
    @NgonNguDay nvarchar(50) = NULL,
    @LoaiMon nvarchar(50) = NULL,
    @MaKhoiKienThuc varchar(10) = NULL,
    @MaMonHocTruoc varchar(15) = NULL,
    @MaMonHocTienQuyet varchar(15) = NULL,
    @MaMonHocSongHanh varchar(15) = NULL,
    @TenMonHocTiengAnh nvarchar(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra môn học đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHoc)
    BEGIN
        RAISERROR('Môn học với mã %s đã tồn tại', 16, 1, @MaMonHoc);
        RETURN;
    END
    
    -- Kiểm tra khối kiến thức
    IF @MaKhoiKienThuc IS NOT NULL AND NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Khối kiến thức với mã %s không tồn tại', 16, 1, @MaKhoiKienThuc);
        RETURN;
    END
    
    -- Kiểm tra môn học trước
    IF @MaMonHocTruoc IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocTruoc)
    BEGIN
        RAISERROR('Môn học trước với mã %s không tồn tại', 16, 1, @MaMonHocTruoc);
        RETURN;
    END
    
    -- Kiểm tra môn học tiên quyết
    IF @MaMonHocTienQuyet IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocTienQuyet)
    BEGIN
        RAISERROR('Môn học tiên quyết với mã %s không tồn tại', 16, 1, @MaMonHocTienQuyet);
        RETURN;
    END
    
    -- Kiểm tra môn học song hành
    IF @MaMonHocSongHanh IS NOT NULL AND NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHocSongHanh)
    BEGIN
        RAISERROR('Môn học song hành với mã %s không tồn tại', 16, 1, @MaMonHocSongHanh);
        RETURN;
    END
    
    -- Thêm môn học mới
    INSERT INTO MonHoc (
        MaMonHoc,
        TenMonHoc,
        SoTinChi,
        SoTietLiThuyet,
        SoTietBaiTap,
        SoTietThucHanh,
        SoTietTuHoc,
        NgonNguDay,
        LoaiMon,
        MaKhoiKienThuc,
        MaMonHocTruoc,
        MaMonHocTienQuyet,
        MaMonHocSongHanh,
        TenMonHocTiengAnh
    ) VALUES (
        @MaMonHoc,
        @TenMonHoc,
        @SoTinChi,
        @SoTietLiThuyet,
        @SoTietBaiTap,
        @SoTietThucHanh,
        @SoTietTuHoc,
        @NgonNguDay,
        @LoaiMon,
        @MaKhoiKienThuc,
        @MaMonHocTruoc,
        @MaMonHocTienQuyet,
        @MaMonHocSongHanh,
        @TenMonHocTiengAnh
    );
    
    -- Trả về môn học vừa thêm với thông tin JOIN
    SELECT 
        mh.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.SoTietLiThuyet,
        mh.SoTietBaiTap,
        mh.SoTietThucHanh,
        mh.SoTietTuHoc,
        mh.NgonNguDay,
        mh.LoaiMon,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTruoc,
        mht.TenMonHoc AS TenMonHocTruoc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet,
        mh.MaMonHocSongHanh,
        mhsh.TenMonHoc AS TenMonHocSongHanh,
        mh.TenMonHocTiengAnh
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mht ON mh.MaMonHocTruoc = mht.MaMonHoc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    LEFT JOIN MonHoc mhsh ON mh.MaMonHocSongHanh = mhsh.MaMonHoc
    WHERE mh.MaMonHoc = @MaMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemMonHocVaoCTDT]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemMonHocVaoCTDT]
    @MaChuongTrinh VARCHAR(20),
    @HocKy VARCHAR(50),
    @MaMonHoc VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Kiểm tra chương trình đào tạo tồn tại
        IF NOT EXISTS (SELECT 1 FROM ChuongTrinhDaoTao 
                       WHERE MaChuongTrinh = @MaChuongTrinh)
        BEGIN
            RAISERROR(N'Chương trình đào tạo không tồn tại', 16, 1);
            RETURN;
        END

        -- Kiểm tra môn học tồn tại
        IF NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHoc)
        BEGIN
            RAISERROR(N'Môn học không tồn tại', 16, 1);
            RETURN;
        END

        -- Kiểm tra môn học đã tồn tại trong chương trình
        IF EXISTS (SELECT 1 FROM ChiTiet_CTDT 
                   WHERE MaChuongTrinh = @MaChuongTrinh AND MaMonHoc = @MaMonHoc)
        BEGIN
            RAISERROR(N'Môn học đã tồn tại trong chương trình đào tạo', 16, 1);
            RETURN;
        END

        -- Thêm môn học vào chương trình
        INSERT INTO ChiTiet_CTDT (MaChuongTrinh, KyHoc, MaMonHoc)
        VALUES (@MaChuongTrinh, @HocKy, @MaMonHoc);

        SELECT N'Thêm môn học thành công' AS Message;

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemMonTuChonVaoHocKy]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemMonTuChonVaoHocKy]
    @MaChuongTrinh VARCHAR(10),
    @MaKhoiKienThuc VARCHAR(10),
    @HocKy VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @MonTuChonTiepTheo VARCHAR(15);
    DECLARE @CoMonTuChon BIT;
    
    -- Kiểm tra xem đã có môn tự chọn nào trong khối kiến thức này chưa
    SELECT @CoMonTuChon = CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM ChiTiet_CTDT ctdt
            JOIN MonHoc mh ON ctdt.MaMonHoc = mh.MaMonHoc
            WHERE ctdt.MaChuongTrinh = @MaChuongTrinh
            AND mh.MaKhoiKienThuc = @MaKhoiKienThuc
            AND ISNUMERIC(ctdt.MaMonHoc) = 1
        ) THEN 1
        ELSE 0
    END;

    IF @CoMonTuChon = 0
    BEGIN
        -- Nếu chưa có môn tự chọn, lấy môn học có mã nhỏ nhất
        SELECT TOP 1 @MonTuChonTiepTheo = mh.MaMonHoc
        FROM MonHoc mh
        WHERE mh.MaKhoiKienThuc = @MaKhoiKienThuc
        AND ISNUMERIC(mh.MaMonHoc) = 1
        AND NOT EXISTS (
            SELECT 1 
            FROM ChiTiet_CTDT ctdt 
            WHERE ctdt.MaChuongTrinh = @MaChuongTrinh 
            AND ctdt.MaMonHoc = mh.MaMonHoc
        )
        ORDER BY CAST(mh.MaMonHoc AS INT);
    END
    ELSE
    BEGIN
        -- Nếu đã có môn tự chọn, lấy mã môn học lớn nhất + 1
        SELECT @MonTuChonTiepTheo = CAST(MAX(CAST(ctdt.MaMonHoc AS INT)) + 1 AS VARCHAR)
        FROM ChiTiet_CTDT ctdt
        JOIN MonHoc mh ON ctdt.MaMonHoc = mh.MaMonHoc
        WHERE ctdt.MaChuongTrinh = @MaChuongTrinh
        AND mh.MaKhoiKienThuc = @MaKhoiKienThuc
        AND ISNUMERIC(ctdt.MaMonHoc) = 1;
    END

    -- Kiểm tra xem môn tự chọn tiếp theo có tồn tại trong bảng MonHoc không
    IF EXISTS (
        SELECT 1 
        FROM MonHoc mh
        WHERE mh.MaMonHoc = @MonTuChonTiepTheo 
        AND mh.MaKhoiKienThuc = @MaKhoiKienThuc
        AND NOT EXISTS (
            SELECT 1 
            FROM ChiTiet_CTDT ctdt 
            WHERE ctdt.MaChuongTrinh = @MaChuongTrinh 
            AND ctdt.MaMonHoc = @MonTuChonTiepTheo
        )
    )
    BEGIN
        -- Thêm môn tự chọn vào CTDT
        INSERT INTO ChiTiet_CTDT (MaChuongTrinh, MaMonHoc, KyHoc)
        VALUES (@MaChuongTrinh, @MonTuChonTiepTheo, @HocKy);
        
        SELECT 1 AS Success, 'Thêm môn tự chọn thành công' AS Message;
    END
    ELSE
    BEGIN
        SELECT 0 AS Success, 'Không tìm thấy môn tự chọn phù hợp để thêm' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemPhongDaoTao]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemPhongDaoTao]
    @TenDangNhap VARCHAR(50),
    @MatKhau NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check trùng tên đăng nhập
    IF EXISTS (SELECT 1 FROM [User] WHERE TenDangNhap = @TenDangNhap)
    BEGIN
        RAISERROR(N'Tên đăng nhập đã tồn tại', 16, 1);
        RETURN;
    END

    -- Sinh ID tự động (dạng PDT001, PDT002, ...)
    DECLARE @ID VARCHAR(10);
    SELECT @ID = 'PDT' + RIGHT('000' + CAST(ISNULL(MAX(CAST(SUBSTRING(ID, 4, 3) AS INT)), 0) + 1 AS VARCHAR), 3)
      FROM [User] WHERE ID LIKE 'PDT%';

    -- Thêm vào bảng User
    INSERT INTO [User] (ID, TenDangNhap, MatKhau, Quyen)
    VALUES (@ID, @TenDangNhap, @MatKhau, N'Phòng đào tạo');

    -- Trả về thông tin vừa thêm
    SELECT * FROM [User] WHERE ID = @ID;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ThemSinhVien]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_ThemSinhVien]
    @HoTen nvarchar(100),
    @NgaySinh date,
    @MaChuongTrinh varchar(10), -- Thay đổi
    @NamNhapHoc int,
    @Email varchar(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @MaSinhVien varchar(10);
    DECLARE @SoThuTu int;
    DECLARE @MatKhau nvarchar(100);
    SET @MatKhau = REPLACE(CONVERT(varchar(10), @NgaySinh, 103), '/', '');
    SELECT @SoThuTu = ISNULL(COUNT(*) + 1, 1)
    FROM [dbo].[SinhVien]
    WHERE MaChuongTrinh = @MaChuongTrinh AND NamNhapHoc = @NamNhapHoc; -- Thay đổi
    SET @MaSinhVien = @MaChuongTrinh + CAST(@NamNhapHoc AS varchar(4)) + RIGHT('000' + CAST(@SoThuTu AS varchar(3)), 3);
    BEGIN TRY
        BEGIN TRANSACTION;
        INSERT INTO [dbo].[SinhVien] (MaSinhVien, HoTen, NgaySinh, MaChuongTrinh, NamNhapHoc, Email) -- Thay đổi
        VALUES (@MaSinhVien, @HoTen, @NgaySinh, @MaChuongTrinh, @NamNhapHoc, @Email);
        INSERT INTO [dbo].[User] (ID, TenDangNhap, MatKhau, Quyen)
        VALUES (@MaSinhVien, @MaSinhVien, @MatKhau, N'Sinh viên');
        COMMIT TRANSACTION;
        SELECT 
            MaSinhVien, 
            HoTen, 
            NgaySinh, 
            MaChuongTrinh, -- Thay đổi
            NamNhapHoc, 
            Email,
            @MatKhau AS MatKhau
        FROM [dbo].[SinhVien]
        WHERE MaSinhVien = @MaSinhVien;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XemChiTietHocKy]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_XemChiTietHocKy]
    @MaChuongTrinh varchar(10),
    @HocKy nvarchar(50),
    @MaChuyenNganh varchar(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Tạo mã học kỳ đầy đủ nếu cần
    DECLARE @KyHocInt int;
    DECLARE @HocKyFull nvarchar(50) = @HocKy;
    
    SET @KyHocInt = CAST(SUBSTRING(@HocKy, 3, LEN(@HocKy)) AS int);
    
    IF @KyHocInt BETWEEN 7 AND 8 AND @MaChuyenNganh IS NOT NULL
    BEGIN
        SET @HocKyFull = @HocKy + '-' + @MaChuyenNganh;
    END
    
    -- Lấy danh sách môn học trong học kỳ
    SELECT 
        ct.MaChuongTrinh,
        ct.MaMonHoc,
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet
    FROM ChiTiet_CTDT ct
    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    WHERE ct.MaChuongTrinh = @MaChuongTrinh AND ct.KyHoc = @HocKyFull;
    
    -- Lấy thông tin tổng hợp học kỳ
    SELECT 
        @HocKyFull AS KyHoc,
        COUNT(mh.MaMonHoc) AS SoMonHoc,
        SUM(mh.SoTinChi) AS TongTinChi
    FROM ChiTiet_CTDT ct
    INNER JOIN MonHoc mh ON ct.MaMonHoc = mh.MaMonHoc
    WHERE ct.MaChuongTrinh = @MaChuongTrinh AND ct.KyHoc = @HocKyFull;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaGiangVien]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Xóa giảng viên + user
CREATE PROCEDURE [dbo].[SP_XoaGiangVien]
    @MaGiangVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM [User] WHERE ID = @MaGiangVien;
    DELETE FROM GiangVien WHERE MaGiangVien = @MaGiangVien;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaKhoiKienThuc]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_XoaKhoiKienThuc]
    @MaKhoiKienThuc VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra tồn tại
    IF NOT EXISTS (SELECT 1 FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Không tìm thấy khối kiến thức với mã %s.', 16, 1, @MaKhoiKienThuc);
        RETURN;
    END

    -- Kiểm tra ràng buộc: có môn học nào đang dùng không?
    IF EXISTS (SELECT 1 FROM MonHoc WHERE MaKhoiKienThuc = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Không thể xóa vì có môn học đang liên kết với khối kiến thức này.', 16, 1);
        RETURN;
    END

    -- Kiểm tra nếu là ParentID của khối khác
    IF EXISTS (SELECT 1 FROM KhoiKienThuc WHERE ParentID = @MaKhoiKienThuc)
    BEGIN
        RAISERROR('Không thể xóa vì đang là ParentID của khối kiến thức khác.', 16, 1);
        RETURN;
    END

    -- Xóa
    DELETE FROM KhoiKienThuc WHERE MaKhoiKienThuc = @MaKhoiKienThuc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaMonHoc]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_XoaMonHoc]
    @MaMonHoc varchar(15)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra môn học tồn tại
    IF NOT EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHoc = @MaMonHoc)
    BEGIN
        RAISERROR('Môn học với mã %s không tồn tại', 16, 1, @MaMonHoc);
        RETURN;
    END
    
    -- Kiểm tra môn học có đang được sử dụng làm môn học tiên quyết không
    IF EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHocTienQuyet = @MaMonHoc)
    BEGIN
        DECLARE @MonLienQuan nvarchar(MAX) = '';
        SELECT @MonLienQuan = @MonLienQuan + MaMonHoc + ' (' + TenMonHoc + '), ' 
        FROM MonHoc 
        WHERE MaMonHocTienQuyet = @MaMonHoc;
        
        SET @MonLienQuan = LEFT(@MonLienQuan, LEN(@MonLienQuan) - 1);
        RAISERROR('Không thể xóa môn học này vì nó là môn tiên quyết cho các môn: %s', 16, 1, @MonLienQuan);
        RETURN;
    END
    
    -- Kiểm tra môn học có đang được sử dụng làm môn học trước không
    IF EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHocTruoc = @MaMonHoc)
    BEGIN
        DECLARE @MonLienQuan2 nvarchar(MAX) = '';
        SELECT @MonLienQuan2 = @MonLienQuan2 + MaMonHoc + ' (' + TenMonHoc + '), ' 
        FROM MonHoc 
        WHERE MaMonHocTruoc = @MaMonHoc;
        
        SET @MonLienQuan2 = LEFT(@MonLienQuan2, LEN(@MonLienQuan2) - 1);
        RAISERROR('Không thể xóa môn học này vì nó là môn học trước cho các môn: %s', 16, 1, @MonLienQuan2);
        RETURN;
    END
    
    -- Kiểm tra môn học có đang được sử dụng làm môn học song hành không
    IF EXISTS (SELECT 1 FROM MonHoc WHERE MaMonHocSongHanh = @MaMonHoc)
    BEGIN
        DECLARE @MonLienQuan3 nvarchar(MAX) = '';
        SELECT @MonLienQuan3 = @MonLienQuan3 + MaMonHoc + ' (' + TenMonHoc + '), ' 
        FROM MonHoc 
        WHERE MaMonHocSongHanh = @MaMonHoc;
        
        SET @MonLienQuan3 = LEFT(@MonLienQuan3, LEN(@MonLienQuan3) - 1);
        RAISERROR('Không thể xóa môn học này vì nó là môn học song hành cho các môn: %s', 16, 1, @MonLienQuan3);
        RETURN;
    END
    
    -- Kiểm tra môn học có trong chương trình đào tạo nào không
    IF EXISTS (SELECT 1 FROM ChiTiet_CTDT WHERE MaMonHoc = @MaMonHoc)
    BEGIN
        DECLARE @CTDT nvarchar(MAX) = '';
        SELECT @CTDT = @CTDT + ct.MaChuongTrinh + ' (' + ctdt.TenChuongTrinh + '), ' 
        FROM ChiTiet_CTDT ct
        JOIN ChuongTrinhDaoTao ctdt ON ct.MaChuongTrinh = ctdt.MaChuongTrinh
        WHERE ct.MaMonHoc = @MaMonHoc
        GROUP BY ct.MaChuongTrinh, ctdt.TenChuongTrinh;
        
        SET @CTDT = LEFT(@CTDT, LEN(@CTDT) - 1);
        RAISERROR('Không thể xóa môn học này vì nó đang thuộc các chương trình đào tạo: %s', 16, 1, @CTDT);
        RETURN;
    END
    
    -- Lưu thông tin môn học trước khi xóa để trả về
    -- Thêm JOIN để lấy các thông tin liên quan
    DECLARE @DeletedMonHoc TABLE (
        MaMonHoc varchar(15),
        TenMonHoc nvarchar(150),
        SoTinChi float,
        MaKhoiKienThuc varchar(10),
        TenKhoiKienThuc nvarchar(150),
        MaMonHocTienQuyet varchar(15),
        TenMonHocTienQuyet nvarchar(150)
    );
    
    INSERT INTO @DeletedMonHoc
    SELECT 
        mh.MaMonHoc, 
        mh.TenMonHoc,
        mh.SoTinChi,
        mh.MaKhoiKienThuc,
        kkt.TenKhoiKienThuc,
        mh.MaMonHocTienQuyet,
        mhtq.TenMonHoc AS TenMonHocTienQuyet
    FROM MonHoc mh
    LEFT JOIN KhoiKienThuc kkt ON mh.MaKhoiKienThuc = kkt.MaKhoiKienThuc
    LEFT JOIN MonHoc mhtq ON mh.MaMonHocTienQuyet = mhtq.MaMonHoc
    WHERE mh.MaMonHoc = @MaMonHoc;
    
    -- Xóa môn học
    DELETE FROM MonHoc WHERE MaMonHoc = @MaMonHoc;
    
    -- Trả về thông tin môn học đã xóa
    SELECT * FROM @DeletedMonHoc;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaMonHocKhoiCTDT]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_XoaMonHocKhoiCTDT]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DELETE FROM ChiTiet_CTDT
        WHERE MaChuongTrinh = @MaChuongTrinh 
        AND MaMonHoc = @MaMonHoc;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END

GO
/****** Object:  StoredProcedure [dbo].[SP_XoaMonTuChonKhoiHocKy]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_XoaMonTuChonKhoiHocKy]
    @MaChuongTrinh VARCHAR(10),
    @MaMonHoc VARCHAR(15),
    @HocKy VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Kiểm tra xem môn học có phải là môn tự chọn không
    IF EXISTS (
        SELECT 1 
        FROM ChiTiet_CTDT ctdt
        JOIN MonHoc mh ON ctdt.MaMonHoc = mh.MaMonHoc
        WHERE ctdt.MaChuongTrinh = @MaChuongTrinh
        AND ctdt.MaMonHoc = @MaMonHoc
        AND ctdt.KyHoc = @HocKy
        AND ISNUMERIC(ctdt.MaMonHoc) = 1
    )
    BEGIN
        -- Xóa môn học tự chọn
        DELETE FROM ChiTiet_CTDT
        WHERE MaChuongTrinh = @MaChuongTrinh
        AND MaMonHoc = @MaMonHoc
        AND KyHoc = @HocKy;
        
        SELECT 1 AS Success, 'Xóa môn tự chọn thành công' AS Message;
    END
    ELSE
    BEGIN
        SELECT 0 AS Success, 'Không tìm thấy môn tự chọn cần xóa' AS Message;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaPhongDaoTao]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_XoaPhongDaoTao]
    @ID VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Chỉ xóa nếu đúng quyền
    IF NOT EXISTS (SELECT 1 FROM [User] WHERE ID = @ID AND Quyen = N'Phòng đào tạo')
    BEGIN
        RAISERROR(N'Không tìm thấy tài khoản Phòng đào tạo với ID này', 16, 1);
        RETURN;
    END

    DELETE FROM [User] WHERE ID = @ID AND Quyen = N'Phòng đào tạo';
END
GO
/****** Object:  StoredProcedure [dbo].[SP_XoaSinhVien]    Script Date: 6/24/2025 7:24:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Xóa sinh viên + user
CREATE PROCEDURE [dbo].[SP_XoaSinhVien]
    @MaSinhVien VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM [User] WHERE ID = @MaSinhVien;
    DELETE FROM SinhVien WHERE MaSinhVien = @MaSinhVien;
END
GO
