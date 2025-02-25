export default function handler(req, res) {
      res.status(200).json({
        location: { lat: 37.7749, lng: -122.4194 },
        energy: 75,
        laserHits: [
          { time: '10:00', hits: 5 },
          { time: '10:30', hits: 7 },
          { time: '11:00', hits: 10 },
          { time: '11:30', hits: 4 },
          { time: '12:00', hits: 8 },
        ],
      });
    }