// sendContent(card) {
//     let newCardContent = card.editCard;
  
//     const formData = {
//       editCard: newCardContent,
//     };
  
//    // Do the PUT, using "?_id=" to specify which document we are affecting
//    const documentId = card._id;
//    fetch('/api/mongodb/projects/?_id=' + documentId, {
//        method: 'PUT',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify(formData),
//      })
//      .then(response => response.json())
//      .then(data => {
//        console.log('Got this back', data);
  
//        // Call method to refresh data
//        this.fetchPosts();
//      });
//   }