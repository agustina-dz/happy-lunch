import "./Footer.css"

export const Footer = () => {
	return (
		<footer>
			<p className="text-bold">Happy Lunch !</p>
			<small>
				<p>Built by Agustina Díaz</p>
				<p><a href="https://talentotech.bue.edu.ar/home" target="_blank" title="Talento Tech - Agencia de Habilidades para el Futuro">Talento Tech</a> ReactJS Course</p>
				<p className="list-title">Assets:</p>
				<ul>
					<li><a href="https://www.flaticon.com/authors/monkey_and_banana/lineal-color" target="_blank" title="Monkey and Banana Stickers">Monkey and Banana stickers created by Stickers - Flaticon</a>. Some images were modified.</li>
					<li><a href="https://ghostpixxells.itch.io/pixel-mart" target="_blank" title="Pixel Mart">Pixel Mart created by ghostpixxells - itch.io</a></li>
					<li><a href="https://pixstuff.itch.io/250-free-pixel-art-concumables-icons" target="_blank" title="250 Free Pixel Art Concumables Icons">250 Free Pixel Art Concumables Icons created by pixStuff - itch.io</a></li>
				</ul>
			</small>
		</footer>
	)
};