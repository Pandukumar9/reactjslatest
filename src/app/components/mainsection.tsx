export function Mainsection() {
    return(
        <>
          <h3 className="text-xl font-semibold text-center mt-8">
            Main Section
          </h3>
          <p className="text-center mt-4">
            This is the main section of the application where you can add your content.
          </p>

          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => alert('Button clicked!')}>
            Click Me
          </button>
        </>
    )
}