export default function Scroll() {
    return (
      <div className="w-[300px] h-[200px] overflow-y-scroll border border-gray-300 p-2">
        <p>This is some content inside the scrollable area.</p>
        <p>Keep adding more content to make it scroll...</p>
        <p>More lines...</p>
        <p>Even more lines...</p>
        <p>And more...</p>
        <p>Until the scroll bar appears!</p>
      </div>
    );
  }