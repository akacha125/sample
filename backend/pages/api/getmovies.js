import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

// API for fetching data from MongoDB database
export default async function handle(req, res) {
  try {
    // Connect to MongoDB
    await mongooseConnect();

    const { method } = req;

    // Handle POST request - Create a new movie
    if (method === "POST") {
      const {
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
        status,
      } = req.body;

      // Create the movie
      const movieData = await Movie.create({
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
        status,
      });

      return res.status(201).json(movieData);
    }

    // Handle GET request - Fetch movies
    if (method === "GET") {
      if (req.query?.id) {
        // Fetch a single movie by id
        const movie = await Movie.findById(req.query.id);
        if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(movie);
      } else {
        // Fetch all movies
        const movies = await Movie.find().sort({ createdAt: -1 }); // Assuming you have a createdAt field for sorting
        return res.status(200).json(movies);
      }
    }

    // Handle PUT request - Update movie
    if (method === "PUT") {
      const {
        _id,
        title,
        slug,
        bgPoster,
        smPoster,
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
        status,
      } = req.body;

      // Update the movie
      const updatedMovie = await Movie.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          bgPoster,
          smPoster,
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
          status,
        },
        { new: true } // Return the updated document
      );

      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      return res.status(200).json(updatedMovie);
    }

    // Handle DELETE request - Delete movie
    if (method === "DELETE") {
      if (req.query?.id) {
        const deletedMovie = await Movie.findByIdAndDelete(req.query.id);
        if (!deletedMovie) {
          return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: "Movie deleted successfully" });
      } else {
        return res.status(400).json({ message: "Movie ID is required" });
      }
    }

    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
