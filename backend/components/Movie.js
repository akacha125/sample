import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Movie(
  {
    _id,
    title: existingtitle,
    slug: existingslug,
    bgposter: existingbgposter,
    smposter: existingsmposter,
    titlecategory: existingtitlecategory,
    description: existingdescription,
    rating: existingrating,
    duration: existingduration,
    episodes: existingepisodes,
    year: existingyear,
    genre: existinggenre,
    language: existinglanguage,
    subtitle: existingsubtitle,
    size: existingsize,
    quality: existingquality,
    youtubelink: existingyoutubelink,
    category: existingcategory,
    watchonline: existingwatchonline,
    downloadlink: existingdownloadlink,
    status: existingstatus,
  }
) {

  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const [title, setTitle] = useState(existingtitle || "");
  const [slug, setSlug] = useState(existingslug || "");
  const [bgposter, setBgposter] = useState(existingbgposter || "");
  const [smposter, setSmposter] = useState(existingsmposter || "");
  const [titlecategory, setTitlecategory] = useState(existingtitlecategory || "");
  const [description, setDescription] = useState(existingdescription || "");
  const [rating, setRating] = useState(existingrating || "");
  const [duration, setDuration] = useState(existingduration || "");
  const [episodes, setEpisodes] = useState(existingepisodes || "");
  const [year, setYear] = useState(existingyear || "");
  const [genre, setGenre] = useState(existinggenre || []);
  const [language, setLanguage] = useState(existinglanguage || "");
  const [subtitle, setSubtitle] = useState(existingsubtitle || "");
  const [size, setSize] = useState(existingsize || "");
  const [quality, setQuality] = useState(existingquality || "");
  const [youtubelink, setYoutubelink] = useState(existingyoutubelink || "");
  const [category, setCategory] = useState(existingcategory || "");
  const [watchonline, setWatchonline] = useState(existingwatchonline || "");
  const [downloadlink, setDownloadlink] = useState(existingdownloadlink || {
    "480p": "",
    "720p": "",
    "1080p": "",
    "4k": "",
    "ep1": "",
    "ep2": "",
    "ep3": "",
    "ep4": "",
    "ep5": "",
    "ep6": "",
    "ep7": "",
    "ep8": "",
    "ep9": "",
    "ep10": "",
    "ep11": "",
    "ep12": "",
    "ep13": "",
    "ep14": "",
    "ep15": "",
    "ep16": "",
    "ep17": "",
    "ep18": "",
    "ep19": "",
    "ep20": "",
    "ep21": "",
    "ep22": "",
    "ep23": "",
    "ep24": "",
    "ep25": "",
    "ep26": "",
    "ep27": "",
    "ep28": "",
    "ep29": "",
    "ep30": "",
  });
  //not use for database
  const [showInputs, setShowInputs] = useState({
    "480p": false,
    "720p": false,
    "1080p": false,
    "4k": false,
    "ep1": false,
    "ep2": false,
    "ep3": false,
    "ep4": false,
    "ep5": false,
    "ep6": false,
    "ep7": false,
    "ep8": false,
    "ep9": false,
    "ep10": false,
    "ep11": false,
    "ep12": false,
    "ep13": false,
    "ep14": false,
    "ep15": false,
    "ep16": false,
    "ep17": false,
    "ep18": false,
    "ep19": false,
    "ep20": false,
    "ep21": false,
    "ep22": false,
    "ep23": false,
    "ep24": false,
    "ep25": false,
    "ep26": false,
    "ep27": false,
    "ep28": false,
    "ep29": false,
    "ep30": false,
  });
  const [status, setStatus] = useState(existingstatus || "");

  //function for create movie
  async function createMovie(ev) {
    ev.preventDefault();

    const data = {
      title,
      slug,
      bgposter,
      smposter,
      titlecategory,
      description,
      rating,
      duration,
      episodes,
      year,
      genre,
      language,
      subtitle,
      size,
      quality,
      youtubelink,
      category,
      watchonline,
      downloadlink,
      status
    };

    try {
      if (_id) {
        await axios.put("/api/getmovies", { ...data, _id });
      } else {
        await axios.post("/api/getmovies", data);
      }
      setRedirect(true);
    } catch (error) {
      console.error("An error occurred while making the request:", error);
    }
  }

  if (redirect) {
    router.push("/");
    return null;
  }

  //Download link functions
  const resolutions = ["480p", "720p", "1080p", "4k", "ep1", "ep2", "ep3", "ep4", "ep5", "ep6", "ep7", "ep8", "ep9", "ep10", "ep11", "ep12", "ep13", "ep14", "ep15", "ep16", "ep17", "ep18", "ep19", "ep20", "ep21", "ep22", "ep23", "ep24", "ep25", "ep26", "ep27", "ep28", "ep29", "ep30"];

  const handleInputChange = (resolution, value) => {
    setDownloadlink((prevstate) => ({
      ...prevstate,
      [resolution]: value,
    }));
  };

  const toggleInputVisibility = (resolution) => {
    setShowInputs((prevstate) => ({
      ...prevstate,
      [resolution]: !prevstate[resolution],
    }));
  };

  //Slug function, url for every space will be genarate - for every time press space
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;

    //Replace space with hyphens
    const newSlug = inputValue.replace(/\s+/g, "-");

    setSlug(newSlug);
  };

  //movie category
  const categories = [
    "Bollywood",
    "telugu",
    "South",
    "Gujarati",
    "Marvel_Studio",
    "Tv_Shows",
    "Web_Series",
  ];

  return (
    <>
      <Head>
        <title>Add Movie page</title>
      </Head>

      <form className="addmovieform" onSubmit={createMovie}>
        {/* preview bgposter and smposter image */}
        <div className="w-100 flex gap-3 mt-1">
          {bgposter ? (
            <div className="bgposter flex flex-col w-70 flex-left">
              <img src={bgposter} id="prv" alt="image" />
              <label htmlFor="prv" className="w-100">
                Background image preview
              </label>
            </div>
          ) : null}
          {smposter ? (
            <div className="smposter flex flex-col w-33 flex-left">
              <img src={smposter} id="prv" alt="image" />
              <label htmlFor="prv" className="w-100">
                Smposter preview
              </label>
            </div>
          ) : null}
        </div>

        <div className="formdata w-100 flex flex-sb mt-3 flex-left">
          <div className="w-50 flex flex-col flex-left">
            {/* Movie background image */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="bgposter">Background Poster</label>
                <input
                  type="text"
                  id="bgposter"
                  placeholder="Bgposter image link"
                  value={bgposter}
                  onChange={(ev) => setBgposter(ev.target.value)}
                />
              </div>
            </div>

            {/* Movie title */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Movie Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="title"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                />
              </div>
            </div>

            {/* Movie description / Storyline */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  id="description"
                  placeholder="description"
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
              </div>
            </div>

            {/* Movie Rating */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  id="rating"
                  placeholder="rating"
                  value={rating}
                  onChange={(ev) => {
                    //ensuare the input does not exceed 10.0
                    let newValue =
                      ev.target.value <= 10.0 ? ev.target.value : 10.0;
                    //ensure the input is not less than 0
                    newValue = newValue >= 0 ? newValue : 0;
                    setRating(newValue);
                  }}
                  step="0.1" //define the step increment as 0.1
                  max="10.0" //set the maximum value to 10.0
                  min="0" //set the minimum value to 0
                />
              </div>

              {/* Movie duration */}
              <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    placeholder="duration"
                    value={duration}
                    onChange={(ev) => setDuration(ev.target.value)}
                  />
                </div>
              </div>
              <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="episodes">Episodes</label>
                  <input
                    type="text"
                    id="episodes"
                    placeholder="episodes"
                    value={episodes}
                    onChange={(ev) => setEpisodes(ev.target.value)}
                  />
                </div>
              </div>

              {/* Movie watchonline link */}
              <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100 flex flex-col flex-left mb-2">
                  <label htmlFor="watchonline">Watchonline Link</label>
                  <input
                    type="text"
                    id="watchonline"
                    placeholder="watchonline"
                    value={watchonline}
                    onChange={(ev) => setWatchonline(ev.target.value)}
                  />
                </div>
              </div>



              {/* Movie downloadlink  */}
              <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="downloadlink" className="mb-2">Download Links</label>
                {resolutions?.map((resolution) => (
                  <div key={resolution} className="flex items-center mb-2">
                    <label
                      htmlFor={`downloadlink${resolution}`}
                      className="text-sm mr-2"
                      style={{ minWidth: "60px" }}
                    >
                      {resolution}
                    </label>
                    <input
                      type="text"
                      id={`downloadlink${resolution}`}
                      className="input-small flex-grow"
                      placeholder={`${resolution} Download link`}
                      value={downloadlink[resolution]}
                      onChange={(ev) => handleInputChange(resolution, ev.target.value)}
                    />
                  </div>
                ))}
              </div>



            </div>

            {/* Movie status (Draft of Publish) */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="status">Status</label>
              <div className="flex gap-05">
                <input
                  type="radio"
                  id="draft"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="draft">Draft</label>
              </div>

              <div className="flex gap-05">
                <input
                  type="radio"
                  id="publish"
                  name="status"
                  value="publish"
                  checked={status === "publish"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="publish">Publish</label>
              </div>
            </div>
          </div>

          <div className="w-50 flex flex-col flex-left">
            {/* Movie small poster */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="smposter">Main Poster</label>
              <input
                type="text"
                id="smposter"
                placeholder="smposter image link"
                value={smposter}
                onChange={(e) => setSmposter(e.target.value)}
              />
            </div>

            {/* Movie slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="slug">Slug (url)</label>
              <input
                type="text"
                id="slug"
                placeholder="url of the movie"
                value={slug}
                onChange={handleSlugChange}
              />
            </div>

            {/* Release year of the movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="year">Release Year</label>
              <input
                type="text"
                id="year"
                placeholder="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            {/* Youtube embed link */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="youtubelink">Youtube Link</label>
              <input
                type="text"
                id="youtubelink"
                placeholder="youtubelink"
                value={youtubelink}
                onChange={(e) => setYoutubelink(e.target.value)}
              />
            </div>

            {/* language of the movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="language">Movie Language</label>
              <select
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                name="language"
                id="language"
              >
                <option value="">Select Language</option>
                <option >Tel</option>
                <option >Tel | Hin</option>
                <option >Tel | Hin | Tam</option>
                <option >Tel | Hin | Tam | Eng</option>
                <option >Hin</option>
                <option >Hin | Tam</option>
                <option >Hin | Tam | Eng</option>
                <option >Tam</option>
                
                <option value="English">Eng</option>
                <option value="Hindi (ORG)">Hindi (ORG)</option>
                <option value="Hindi - English">Hindi (ORG)</option>
                <option value="Dual Audio [Hindi (ORG) + English]">
                  Dual Audio [Hindi (ORG) + English]
                </option>
                <option value="Dual Audio [Hindi (Cleaned) + English]">
                  Dual Audio [Hindi (Cleaned) + English]
                </option>
              </select>
            </div>

            {/* Quality of the movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="quality">Movie Quality</label>
              <select
                onChange={(e) => setQuality(e.target.value)}
                value={quality}
                name="quality"
                id="quality"
              >
                <option value="">Select Quality</option>
                <option value="480p || 720p || 1080p - WEB-DL">
                  480p || 720p || 1080p - WEB-DL
                </option>
                <option value="480p || 720p || 1080p || 2160p - WEB-DL">
                  480p || 720p || 1080p || 2160p - WEB-DL
                </option>
                <option value="480p || 720p || 1080p - HDTC">
                  480p || 720p || 1080p - HDTC
                </option>
              </select>
            </div>

            {/* subtitle of the movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="subtitle">Movie Subtitle</label>
              <select
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
                name="quality"
                id="quality"
              >
                <option value="">Select Subtitle</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Size of the movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="size">Size of the movie</label>
              <input
                type="text"
                id="size"
                placeholder="350MB || 1GB || 2GB || 4GB"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>

            <div className="moviecategory flex flex-sb flex-left">
              {/* movie title category */}
              <div className="w-50 flex flex-col flex-left mb-2">
                <label>Title Category :</label>
                {["Movie", "Series", "Show", "Anime", "films"].map((cat) => (
                  <div key={cat} className="flex gap-05">
                    <input
                      type="radio"
                      id={cat.toLowerCase()}
                      name="titlecategory"
                      value={cat.toLowerCase()}
                      checked={titlecategory === cat.toLowerCase()}
                      onChange={(e) => setTitlecategory(e.target.value)}
                    />
                    <label htmlFor={cat.toLowerCase()}>{cat}</label>
                  </div>
                ))}
              </div>

              {/* movie category */}
              <div className="moviecategory flex flex-sb flex-left">
                <div className="w-50 flex flex-col flex-left mb-2">
                  <label>Title Category :</label>
                  {categories.map((cat) => (
                    <div key={cat} className="flex gap-05">
                      <input
                        type="radio"
                        id={cat.toLowerCase()}
                        name="category"
                        value={cat.toLowerCase()}
                        checked={category === cat.toLowerCase()}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <label htmlFor={cat.toLowerCase()}>{cat}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* movie genre */}
              <div className="moviecategory flex flex-sb flex-left">
                <div className="w-50 flex flex-col flex-left mb-2">
                  <label>Movie Genre :</label>
                  {[
                    "Action",
                    "Adventure",
                    "Animation",
                    "Comedy",
                    "Drama",
                    "Crime",
                    "Fantasy",
                    "Horror",
                    "Romance",
                    "Thriller",
                    "Science_Fiction",
                  ].map((genreOption) => (
                    <label key={genreOption} className="flex gap-05">
                      <input
                        type="checkbox"
                        value={genreOption.toLocaleLowerCase()}
                        checked={genre.includes(
                          genreOption.toLocaleLowerCase()
                        )}
                        onChange={(e) => {
                          const selectedGenre = e.target.value;
                          setGenre((preGenre) => {
                            if (preGenre.includes(selectedGenre)) {
                              return preGenre.filter(
                                (genre) => genre !== selectedGenre
                              );
                            } else {
                              return [...preGenre, selectedGenre];
                            }
                          });
                        }}
                      />
                      {genreOption}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* for save all data in mongoDB for submit button */}
        <div className="w-100 mb-2">
          <button type="sbmit" className="w-100 flex-center">
            SAVE DATA
          </button>
        </div>
      </form>
    </>
  );
}
