import Footer from "../components/Footer";
import Header from "../components/Header";

export const Game = () => {
    return (
        <>
        <Header />
        <section class="game-section">
            <h1>Spot the Fake</h1>
            <p>Scroll through the images below. Choose "Real" if you think the person is real, or "Fake" if you think it's a deepfake.</p>

            <div class="gallery">
                <div class="image-item" data-correct-answer="fake">
                    <img src="../pics/fake1.jpg" alt="Person 1" />
                </div>

                <div class="image-item" data-correct-answer="real">
                    <img src="../pics/fake2.jpg" alt="Person 2" />
                </div>

                <div class="image-item" data-correct-answer="real">
                    <img src="../pics/fake1.jpg" alt="Person 3" />
                </div>

                <div class="image-item" data-correct-answer="real">
                    <img src="../pics/fake2.jpg" alt="Person 4" />
                </div>
            </div>
        </section>
            <Footer />
        </>
    )
}