import React, { useCallback, useEffect, useRef, useState } from "react";
import ScrollableList from "./scrollableList";
import "../styles/_dialog.scss";

interface DialogProps {
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onClose }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isImageVisible, setImageVisible] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const dialogRef = useRef<HTMLDivElement>(null);
	const [names, setNames] = useState<string[]>(["Leann","Fernanda","Dahlia","Josie",
		"Stone","Kenneth","Darlene","Jazmin","Conrad","Finn","Abram","Clayton","Kaylah",
		"Nikita","Tobias","Kaylea","Allyson","Jamil","Selah","Aya","Carson","Tatiana",
		"Dara","Stephen","Ivory","Carina","Madeline","Heriberto","Roxana","Maiya","Mckenzie",
		"Kenny","Ashlynn","Quentin","Kameryn","Jasmin","Marcos","Jarrett","Keira","Tiarra",
		"Taylar","Ellie","Cody","Stanley","Salena","Amani","Jamie","Jessika","Ann","Kate",
		"Isaak","Christian","Zachariah","Hope","Elisha","Deandre","Ansley","Shyla","Kelsie",
		"Isabelle","Madilyn","Dallin","Sabina","Makaela","Jolie","Cedric","Madysen","Kain",
		"Phoenix","Bonnie","Corrine","Demarcus","Joel","Braden","Carlton","Jimmy","Myles",
		"Brenda","Ignacio","Baby","Colby","Kamren","Roxanne","Ali","Desirae","Marcus","Walker",
		"Austyn","Melvin","Joana","Montserrat","Mina","Susanna","Eleazar","Menachem","Kaycee",
		"Cole","Howard","Hailee","Shayla","Kaylee","Shivani","Raven","Delaney","Stephan","Paul",
		"Bruno","Armand","Luisa","Maria","Keanu","Kari","Angel","Logan","Dakotah","Racheal",
		"Alessandra","Brigid","Rogelio","Kaley","Chandler","Tyra","Loren","Vera","Lloyd",
		"Malachi","Natalya","Giovanny","Victor","Dale","Craig","Adam","Raegan","Aron","Abbie",
		"Elijah","Quincy","Evelin","Jalon","Emiliano","Bernard","Blaze","Christopher","Perry",
		"Desean","Yosef","Corina","Hailey","Demetrius","Ian","Bridgett","Joanna","Tori","Nick",
		"Terrance","Julianne","Lyle","Bailey","Keegan","Dakota","Tierney","Bill","Paola","Gaven",
		"Zane","Keara","Karina","Sean","Marion","Misty","Lindsey","Patrick","Bethany","Chaim",
		"Bryson","Jamari","Hillary","Ajay","Charity","Amia","Nathalia","Shanya","Zain","Micayla",
		"Fred","Daysha","Vaughn","Gary","Janette","Wyatt","Marquis","Nolan","Cloe","Heath","Dayton",
		"Pamela","Genevieve","Jean","Cory","Brady","Ruben","Noa","Edmund","Isidro","Rubi",
		"Nathanael","Julius","Orion","Wendy","Mateo","Jazlyn","Theo","Santana","Linda","Luca",
		"Cristobal","Gerardo","Karen","Sammy","Chase","Brisa","Brielle","Dalton","Timmy","Luke",
		"Ishmael","Shreya","Tomas","Holden","Juan","Bailee","Kyara","Dan","Abigayle","Ashli",
		"Gisel","Nevin","Jamila","Jaylan","Robin","Serina","Triston","Tommy","Meredith","Ricardo",
		"Priscilla","Anders","Gregorio","Rafael","Cecelia","Zoe","Itzel","Keven","Kamryn","Kelsey",
		"Destinee","Diana","Gage","Jasper","Osvaldo","Fiona","Kaeli","Amos","Hezekiah","Samara",
		"Drew","Kalvin","Jennie","Vivian","Sawyer","Darryl","Cierra","Jeremy","Sidney","Theodore",
		"Greyson","Alora","Malika","Jaiden","Mahogany","Damien","Louis","Skye","Maliyah","Mallory",
		"Raheem","Milan","Linsey","Doris","Irvin","Jamar","Donald","Marcela","Arjun","Beatrice",
		"Tracy","Aman","Sahil","Dorien","Reed","Tiara","Jayce","Latavia","Nyasia","Catalina",
		"Demonte","Maegan","Terri","Amina","Jaquez","Kenan","Brea","Rileigh","Jeffrey","Alberto",
		"Xzavier","Jaron","Bishop","Yousef","Dashawn","Brayan","Theron","Willie","Brian","Esther",
		"Leandra","Dillon","Jay","Julien","Jessica","Jimmie","Autum","Lonnie","Katya","Harris",
		"Alison","Rhett","Clinton","Carolyn","Esperanza","Jaqueline","Jenna","Paulina","Iman",
		"Reagan","Yaquelin","Valeria","Beau","Mohamed","Everardo","Maira","Infant","Lynn","Waylon",
		"Henry","Ryland","Gannon","Kailyn","Bria","Adan","Jakobe","Zackery","Dante","Emilie",
		"Kierra","Jania","Kinley","Madison","Brett","Micah","Stacey","Yolanda","Maren","Raphael",
		"Draven","Jodie","Tamara","Tiffani","Stevie","Ladarius","Eli","Blayne","Melissa","Shannon",
		"Trinity","Haden","Zavier","Damaris","Gianni","Ambria","Leia","Carleigh","Malcolm","Melina",
		"Kelsi","Muhammad","August","Natalee","Tyquan","Maci","Harry","Daijah","Ervin","Johanna",
		"Morgan","Aryanna","Quinton","Jordy","Shiann","Linnea","Yusuf","Keelan","Matthias","Diamond",
		"Neal","Dameon","Chad","Johnathan","Miguelangel","Hayleigh","Geneva","Dylon","Lionel",
		"Kristofer","Nicolas","Todd","Ezequiel","Gideon","Dianna","Junior","Jeremiah","Lisbeth",
		"Daylon","Essence","Brandon","Isai","Bobbi","Jase","Lissette","Leslie","Mara","Melany",
		"Malorie","Troy","Kameron","Darrius","Kathrine","Jacy","Heidi","Dean","Eunice","Rodney",
		"Antonia","Lexi","Cynthia","Bradley","Jamir","Grayson","Kelton","Enzo","Aidan","Kierstin",
		"Eliseo","Giavanna","Ryan","Haily","Reuben","Kole","Yulisa","Shelbie","Bernardo","Araceli",
		"Jeniffer","Kyndall","Kavon","Tea","Lisa","Davonte","Tatum","Stefany","Dillan","Fletcher",
		"Danielle","Kerrigan","Cayden","Iyanna","Augustine","Chancellor","Irving","Jamaal","Brannon",
		"Shakira","Shelton","Donnell","Tyshawn","Anjelica","Lillie","Jessenia","Dariana","Gabriel"]);
	const [namesSlice, setNamesSlice] = useState<string[]>(names.slice(0, 20));
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false); 

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(onClose, 400);
	}, [onClose]);

	useEffect(() => {
		setIsVisible(true);

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose();
			}
		};

		const handleMouseClick = (event: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
				handleClose();
			}
		};

		window.addEventListener("keydown", handleEscKey);
		window.addEventListener("mousedown", handleMouseClick);

		return () => {
			window.removeEventListener("keydown", handleEscKey);
			window.removeEventListener("mousedown", handleMouseClick);
		};
	},[handleClose]);

	const handleBottomScroll = () => {
		if (isLoading || !hasMore){
			return;
		}

		setIsLoading(true); 

		setTimeout(() => {
			setNamesSlice((prevNamesSlice) => {
				const newLength = prevNamesSlice.length + 20;
				if (newLength >= names.length) {
					setHasMore(false);
					return names; 
				}
				return names.slice(0, newLength); 
			});
			setIsLoading(false); 
		}, 500);
	};

	const handleDelete = (index: number) => {
		const newNamesSlice = [...namesSlice];
		newNamesSlice.splice(index, 1);
		names.splice(index, 1);
		if (index === newNamesSlice.length) {
			setImageVisible(true);
			setImageUrl("https://placecats.com/200/200");
		} else {
			setImageVisible(false);
		}

		setNamesSlice(newNamesSlice); 
		setNames(names);
	};

	return (
		<div className={`dialog-backdrop ${isVisible ? 'visible' : ''}`}>
			<div className={`dialog ${isVisible ? 'visible' : ''}`} ref={dialogRef}>
				<h3>Dialog Window</h3>
				<div className="dialog-links">
					<p>
						<a href="https://google.com/">
							<i className="fas fa-external-link-alt"></i>
							Visit Google
						</a>
					</p>
					<p>
						<a href="https://yahoo.com/">
							<i className="fas fa-external-link-alt"></i>
							Visit Yahoo
						</a>
					</p>
					<p>
						<a href="https://placecats.com/">
							<i className="fas fa-external-link-alt"></i>
							Visit PlaceCats
						</a>
					</p>
				</div>

				<ScrollableList onScrollToBottom={hasMore ? handleBottomScroll : undefined}
					content={namesSlice} onDelete={handleDelete}/>

				{isImageVisible && (
					<div>
						<h4>You have deleted the last item!</h4>
						<img src={imageUrl} alt="You have deleted the last item!" />
					</div>
				)}

				<button className="dialog-delete-btn" onClick= {() => handleDelete(namesSlice.length-1)}>
					Delete Last Item
				</button>
				<button className="dialog-close-btn" onClick={handleClose}>
					Close Dialog
				</button>
			</div>
		</div>
	);
};

export default Dialog;
