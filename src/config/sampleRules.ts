/**
 * Rule dịch QuickTranslate — bộ mẫu tham khảo chính thức của vBook Community
 */
export const SAMPLE_RULES_CONTENT = `# Rule dịch QuickTranslate — bộ mẫu tham khảo
#
# Mỗi dòng: mẫu = bản dịch. Dòng trống và dòng bắt đầu bằng # bị bỏ qua.
#
# THỨ TỰ DÒNG KHÔNG QUAN TRỌNG. Engine tự xếp rule cùng ký tự neo theo độ cụ thể
# (tổng độ dài tối đa của mọi token) giảm dần; hoà thì rule ít wildcard hơn thắng.
# File lưu dạng .dic sắp xếp theo khoá nên thứ tự gõ tay không sống sót qua vòng
# nhập/xuất — cách nhóm bên dưới chỉ để người đọc dễ theo dõi.
#
# Mỗi rule bắt buộc có ít nhất một ký tự thường để làm neo, và ít nhất một token
# wildcard. Neo KHÔNG được là hư từ trần (的 了 是 不 在 一 …).
#
# Token:
#   <n>   chuỗi số Hán/Ả Rập, kể cả đơn vị 十百千萬  ->  số Ả Rập (三十六 -> 36)
#   <y>   năm đọc từng chữ, KHÔNG nhận đơn vị        ->  二〇一九 -> 2019
#   <L>   một ký tự nhãn chương 章卷集节幕回折         ->  Chương / Quyển / Tập …
#   <ne>  cụm có trong từ điển Name
#   <pn>  cụm có trong từ điển Pronoun (nhân xưng)
#   <vp>  cụm có trong từ điển VietPhrase
#   <hv>  một ký tự có trong từ điển Hán Việt
#   <w>   viết tắt của <ne|pn|vp>
#
#   <a|b>      lựa chọn CÓ THỨ TỰ — nguồn bên trái khớp thì dừng
#   (a|b)      nhóm ký tự thường, thêm ? để cho phép vắng mặt
#   :min-max   giới hạn độ dài, ví dụ <ne:1-4>. Mặc định 1..maxPhraseSize.
#   {0} {1}    tham chiếu token sinh giá trị, đánh số theo thứ tự trong mẫu
#
# Chi tiết: docs/qt-translate-rules.md

# ---- Ngày tháng năm -------------------------------------------------------
# <y> chỉ nhận chữ số đơn (không nhận 十/百/千) nên "十年" đi vào mẫu "<n>年"
# ở khối đơn vị đếm, cho ra "10 năm" chứ không phải một năm lịch.
<y:3-4>年<n:1-2>月<n:1-2>日 = ngày {2} tháng {1} năm {0}
<y:3-4>年<n:1-2>月 = tháng {1} năm {0}
<y:3-4>年 = năm {0}
<n:1-2>月<n:1-2>日 = ngày {1} tháng {0}

# ---- Giờ phút giây --------------------------------------------------------
# Sau số luôn phải có đơn vị (分/秒/半/整/刻) — "<n>点" trần sẽ nuốt "一点"
# (một chút). Mẫu giờ nặng hơn hoặc ít wildcard hơn mẫu thập phân bên dưới nên
# luôn được thử trước: "三点十五分" là giờ chứ không phải 3.15, "三点一刻" là
# 3 giờ 15 chứ không phải 3.1.
<n:1-2>点<n:1-2>分<n:1-2>秒 = {0} giờ {1} phút {2} giây
<n:1-2>点<n:1-2>分 = {0} giờ {1} phút
<n:1-2>点半 = {0} giờ rưỡi
<n:1-2>点整 = đúng {0} giờ
<n:1-2>点一刻 = {0} giờ 15 phút
<n:1-2>点(两|二)刻 = {0} giờ 30 phút
<n:1-2>点三刻 = {0} giờ 45 phút
<n:1-2>(时|時)<n:1-2>分<n:1-2>秒 = {0} giờ {1} phút {2} giây
<n:1-2>(时|時)<n:1-2>分 = {0} giờ {1} phút
<n:1-3>分<n:1-2>秒 = {0} phút {1} giây
<n:1-3>分(钟|鐘) = {0} phút
<n:1-3>秒(钟|鐘)? = {0} giây
<n:1-3>小(时|時) = {0} tiếng

# ---- Số thập phân ---------------------------------------------------------
# Chỉ nổ khi sau dấu 点 là SỐ và không có đơn vị thời gian đi kèm. Các mẫu giờ
# ở trên nặng hơn nên luôn được thử trước; mẫu 点一刻 tuy cùng độ cụ thể nhưng
# ít wildcard hơn nên vẫn thắng.
#
# Phần sau dấu phẩy dùng <y> chứ không phải <n>: tiếng Trung đọc từng chữ số
# ("三点一四" = 3.14), còn <n> sẽ cộng dồn thành 3.5.
#
# Rủi ro còn lại là thành ngữ dạng số-点-số như "两点一线" (2.1线). Từ điển
# VietPhrase phủ quyết được nếu có mục đó — đây là lý do mẫu này chỉ an toàn
# sau khi cơ chế phủ quyết ra đời.
<n:1-2>点<y:1-2> = {0}.{1}

# Phần trăm thập phân phải nặng hơn "百分之<n>" trần, nếu không "百分之三点五"
# thành "3%" rồi bỏ lại "点五".
百分之<n:1-6>点<y:1-2> = {0}.{1}%

# ---- Chương hồi trong thân truyện -----------------------------------------
# Tiêu đề chương đi đường xử lý riêng, không qua rule.
第<n:1-6><L> = {1} {0}

# ---- Phần trăm ------------------------------------------------------------
百分之<n:1-6> = {0}%

# ---- Tiền tệ hiện đại -----------------------------------------------------
# Đơn vị 万/亿 tách thành ký tự thường để giữ cách đọc quen thuộc ("3 vạn tệ"
# thay vì "30000 tệ"). 万/亿 đứng trước 元 trong CÂU, mà engine quét trái sang
# phải, nên "三万元" chạm neo 万 trước và không rơi vào mẫu "<n>元" trần.
<n:1-6>万元 = {0} vạn tệ
<n:1-6>亿元 = {0} ức tệ
<n:1-8>美元 = {0} đô la
<n:1-8>美金 = {0} đô la
<n:1-8>欧元 = {0} euro
<n:1-8>日元 = {0} yên
<n:1-8>英镑 = {0} bảng Anh
<n:1-8>港币 = {0} đô la Hồng Kông
<n:1-8>人民币 = {0} nhân dân tệ
<n:1-8>元钱 = {0} đồng
<n:1-8>块钱 = {0} đồng
<n:1-8>元 = {0} tệ

# ---- Tiền cổ trang / tu tiên ----------------------------------------------
# Lượng từ 块/枚/颗/粒 gần như luôn chen giữa số và vật ("三块灵石"), nên gói vào
# nhóm tùy chọn thay vì viết hai dòng cho mỗi vật.

# Tiền kim loại
<n:1-8>(枚|块)?金币 = {0} đồng vàng
<n:1-8>(枚|块)?银币 = {0} đồng bạc
<n:1-8>(枚|块)?铜板 = {0} đồng tiền
<n:1-8>(枚|块)?铜钱 = {0} đồng tiền
<n:1-8>文钱 = {0} văn tiền
<n:1-8>(锭|块)?金锭 = {0} đĩnh vàng
<n:1-8>(锭|块)?银锭 = {0} đĩnh bạc
<n:1-8>锭银子 = {0} đĩnh bạc
<n:1-8>金叶子 = {0} lá vàng
<n:1-8>(贯|吊)钱 = {0} quan tiền

# Bạc/vàng theo lượng. Mẫu dài có độ cụ thể cao hơn nên tự thắng "<n>两";
# không phụ thuộc vị trí dòng.
<n:1-8>两纹银 = {0} lượng bạc
<n:1-8>两白银 = {0} lượng bạc
<n:1-8>两银子 = {0} lượng bạc
<n:1-8>两黄金 = {0} lượng vàng
<n:1-8>两金子 = {0} lượng vàng

# Linh thạch và biến thể theo phẩm cấp — mẫu có phẩm cấp dài hơn nên tự thắng.
<n:1-8>(块|枚|颗)?极品灵石 = {0} linh thạch cực phẩm
<n:1-8>(块|枚|颗)?上品灵石 = {0} linh thạch thượng phẩm
<n:1-8>(块|枚|颗)?中品灵石 = {0} linh thạch trung phẩm
<n:1-8>(块|枚|颗)?下品灵石 = {0} linh thạch hạ phẩm
<n:1-8>(块|枚|颗)?灵石 = {0} linh thạch
<n:1-8>(块|枚|颗)?灵晶 = {0} linh tinh
<n:1-8>(块|枚|颗)?仙石 = {0} tiên thạch
<n:1-8>(块|枚|颗)?魔晶 = {0} ma tinh
<n:1-8>(块|枚|颗)?妖丹 = {0} yêu đan
<n:1-8>(块|枚|颗)?晶核 = {0} tinh hạch

# Vật phẩm đếm được hay gặp
<n:1-8>(枚|颗|粒)?丹药 = {0} viên đan dược
<n:1-8>(张|枚)?符箓 = {0} lá phù lục
<n:1-8>(株|棵)?灵草 = {0} cây linh thảo

# Điểm số môn phái / hệ thống
<n:1-8>贡献点 = {0} điểm cống hiến
<n:1-8>功勋点 = {0} điểm công huân
<n:1-8>积分 = {0} điểm tích lũy
<n:1-8>星币 = {0} tinh tệ

# Cảnh giới / cấp bậc. 第 bắt buộc với 重 vì 重 thường là "nặng/lặp lại".
<n:1-2>阶 = giai {0}
第<n:1-3>重 = tầng {0}
<n:1-3>甲子 = {0} giáp tử

# ---- Đơn vị đếm (rút từ bộ LuatNhan cũ) -----------------------------------
# Bộ LuatNhan cũ (7859 mục) hầu hết là câu mẫu cứng với đúng một chỗ trống {0}.
# Phần còn giá trị là các LƯỢNG TỪ đi sau số — gom lại thành rule tổng quát thì
# thay được hàng trăm mục cũ. Số trong ngoặc là số mục cũ dùng lượng từ đó.

# Tuổi (35 + 18 + 4). Mẫu dài hơn tự thắng "<n>岁".
<n:1-3>岁左右 = chừng {0} tuổi
<n:1-3>多岁 = hơn {0} tuổi
<n:1-3>来岁 = chừng {0} tuổi
<n:1-3>岁 = {0} tuổi

# Thời gian (36 + 42 + 35)
<n:1-2>个多月 = hơn {0} tháng
<n:1-2>个月 = {0} tháng
<n:1-3>天 = {0} ngày
<n:1-3>年 = {0} năm

# Lần / tầng / cấp (13 + 6 + 5 + 3)
第<n:1-4>次 = lần thứ {0}
<n:1-4>次 = {0} lần
第<n:1-3>层 = tầng {0}
<n:1-3>层 = {0} tầng
<n:1-2>级 = cấp {0}
<n:1-4>倍 = {0} lần

# Đo lường (8 + 6 + 5)
<n:1-6>公里 = {0} km
<n:1-6>米 = {0} mét
<n:1-2>丈 = {0} trượng

# ---- Khối lượng -----------------------------------------------------------
# Đơn vị ghép (公斤/毫克) có ký tự neo nằm TRƯỚC đơn vị trần (斤/克) trong câu,
# mà engine quét trái sang phải, nên "三公斤" luôn khớp 公斤 chứ không rơi vào 斤.
<n:1-6>公斤 = {0} kg
<n:1-6>毫克 = {0} mg
<n:1-6>克 = {0} gam
<n:1-6>吨 = {0} tấn
<n:1-6>斤 = {0} cân

# ---- Thể tích -------------------------------------------------------------
<n:1-6>毫升 = {0} ml
<n:1-6>升 = {0} lít
<n:1-4>立方米 = {0} m³
<n:1-4>立方 = {0} khối

# ---- Diện tích ------------------------------------------------------------
<n:1-4>平方公里 = {0} km²
<n:1-4>平方米 = {0} m²
<n:1-4>亩 = {0} mẫu

# ---- Chiều dài bổ sung ----------------------------------------------------
<n:1-6>厘米 = {0} cm
<n:1-6>毫米 = {0} mm
<n:1-3>尺 = {0} thước
<n:1-3>寸 = {0} tấc

# Người (49)
<n:1-4>个人 = {0} người

# ---- Không đưa vào mặc định (rủi ro cao) ----------------------------------
# 里 (68 mục): sau số thì là "dặm", nhưng 百里/万里 còn là họ và thành ngữ
#   ("vạn lý"), bật lên sẽ dịch hỏng tên riêng.
# <n:1-6>里 = {0} dặm
#
# 重 trần (3 mục): 重 chủ yếu là "nặng/lặp lại". Bản có 第 đứng trước đã nằm
#   trong mục cảnh giới ở trên, an toàn hơn nhiều.
# <n:1-2>重 = tầng {0}
#
# 成 (8 mục): 成 thường là "thành", nghĩa "phần mười" rất hiếm.
# <n:1-2>成 = {0} phần
`;
