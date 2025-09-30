function Hero () {
    return (
        <section className="flex bg-testingColorCardsBackground">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="flex justify-center text-3xl font-bold mb-4 text-black">Maintenance Services</h2>
                <p className="flex justify-center text-center text-lg leading-relaxed text-black">    All maintenance requests are managed through our trusted third-party system. 
                    This ensures that every issue is tracked, handled efficiently, and resolved 
                    by the right professionals. Please use the portal to submit new requests or 
                    check the status of existing ones at any time.</p>
                <button className="mt-6 px-6 py-3 bg-gray-400 text-white font-medium rounded-lg shadow hover:bg-gray-600">Access Maintenance Portal</button>
            </div>
            <hr/>
            
        </section>
        
    );
}
export default Hero;