exports.getAllAllUniversitiesAccordingZone = async (req, res) => {
  try {
    const allUniversities = await AllUniversity.find().populate("UniversityZone");

    // Grouped data for zones
    const combinedData = allUniversities.map((university) => ({
      UniversityZone: university.UniversityZone.UniversityZone,
      Universities: university.Universities,
      Link: university.Link,
    }));

    // 🔽 Extract all university names from the HTML (li items)
    const allNames = allUniversities.flatMap((university) => {
      const matches = university.Universities.match(/<li[^>]*>(.*?)<\/li>/g) || [];
      return matches.map((li) => li.replace(/<\/?li[^>]*>/g, "").trim());
    });

    const uniqueNames = [...new Set(allNames)];

    res.status(200).json({ success: true, data: combinedData, universities: uniqueNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
