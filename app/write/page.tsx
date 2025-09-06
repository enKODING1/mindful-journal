export default function WritePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">작성하기</h2>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-gray-600">작성하기</h3>
        <p className="text-sm text-gray-600">작성하기</p>
      </div>

      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">내용</span>
          </label>
        </div>
        <div className="form-control">
          <textarea className="textarea textarea-bordered" />
        </div>
        <div className="form-control">
          <label className="label">오늘의 기분은 어떠신가요 ?</label>
        </div>
          <select className="select select-bordered">
            <option value="happy">기쁨</option>
            <option value="sad">슬픔</option>
            <option value="angry">화남</option>
            <option value="tired">피곤</option>
            <option value="relaxed">편안</option>
          </select>
        <br></br>
        <button className="btn btn-primary mt-4">기록하기</button>
      </form>
    </div>
  );
}