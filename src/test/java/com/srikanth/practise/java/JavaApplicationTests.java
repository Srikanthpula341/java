package com.srikanth.practise.java;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JavaApplicationTests {

	@Test
	void contextLoads() {
	}

	public VersionResponseDTOV1 transformToV1(VersionResponseDTO originalDto) {
        List<VersionResponseV1> v1Documents = originalDto.getDocuments().stream()
            .map(this::transformDocument)
            .collect(Collectors.toList());

        VersionResponseDTOV1 v1Dto = new VersionResponseDTOV1();
        v1Dto.setDocuments(v1Documents);
        return v1Dto;
    }

    private VersionResponseV1 transformDocument(VersionResponse original) {
        VersionResponseV1 v1 = new VersionResponseV1();
        v1.setCollectionType(original.getCollectionType());
        v1.setCreationDate(original.getCreationDate());
        v1.setStatus(original.getStatus());
        v1.setSotDocumentVersion(original.getSotDocumentVersion());
        v1.setHoldingDocumentVersion(original.getHoldingDocumentVersion());
        v1.setErrorCount(original.getErrorCount());

        HeaderRequestDTO oldHeader = original.getHeaderRequestData();
        HeaderRequestDTOV1 newHeader = new HeaderRequestDTOV1();
        newHeader.setClientDocumentId(oldHeader.getAssociationHoldingId());
        newHeader.setClientDocumentVersion(String.valueOf(oldHeader.getClientSOTVersion()));
        newHeader.setPlanDocumentId(oldHeader.getPlanSOTId());
        newHeader.setPlanDocumentVersion(String.valueOf(oldHeader.getPlanSOTVersion()));

        v1.setHeaderRequestData(newHeader);

        return v1;
    }



	public VersionResponseDTOV1 getVersionWithCSP2(String documentType, String documentId) throws BadRequestException {
    // Call the existing API
    VersionResponseDTO response = getVersionsWithCSP(documentType, documentId);

    // Transform each VersionResponse -> VersionResponseV1
    List<VersionResponseV1> v1Documents = response.getDocuments().stream()
        .map(this::transformToV1)
        .collect(Collectors.toList());

    // Set into new DTO V1
    VersionResponseDTOV1 v1Dto = new VersionResponseDTOV1();
    v1Dto.setDocuments(v1Documents);
    return v1Dto;
}

private VersionResponseV1 transformToV1(VersionResponse original) {
    VersionResponseV1 v1 = new VersionResponseV1();
    v1.setCollectionType(original.getCollectionType());
    v1.setCreationDate(original.getCreationDate());
    v1.setStatus(original.getStatus());
    v1.setSotDocumentVersion(original.getSotDocumentVersion());
    v1.setHoldingDocumentVersion(original.getHoldingDocumentVersion());
    v1.setErrorCount(original.getErrorCount());

    HeaderRequestDTO oldHeader = original.getHeaderRequestData();
    if (oldHeader != null) {
        HeaderRequestDTOV1 newHeader = new HeaderRequestDTOV1();
        newHeader.setClientDocumentId(oldHeader.getAssociationHoldingId());
        newHeader.setClientDocumentVersion(String.valueOf(oldHeader.getClientSOTVersion()));
        newHeader.setPlanDocumentId(oldHeader.getPlanSOTId());
        newHeader.setPlanDocumentVersion(String.valueOf(oldHeader.getPlanSOTVersion()));
        v1.setHeaderRequestData(newHeader);
    }

    return v1;
}

public VersionResponseDTOV1 getVersionsV1(String documentType, String documentId) throws BadRequestException {
    // Validate inputs
    if (documentType == null || documentType.isEmpty() || documentId == null || documentId.isEmpty()) {
        throw new BadRequestException("Type and Document ID must be provided");
    }

    // Call existing method
    VersionResponseDTO originalResponse = getVersions(documentType, documentId);

    // Transform to V1 format
    List<VersionResponseV1> v1Documents = originalResponse.getDocuments().stream()
        .map(this::transformToV1)
        .collect(Collectors.toList());

    VersionResponseDTOV1 v1Dto = new VersionResponseDTOV1();
    v1Dto.setDocuments(v1Documents);
    return v1Dto;
}

private VersionResponseV1 transformToV1(VersionResponse original) {
    VersionResponseV1 v1 = new VersionResponseV1();
    v1.setCollectionType(original.getCollectionType());
    v1.setCreationDate(original.getCreationDate());
    v1.setStatus(original.getStatus());
    v1.setSotDocumentVersion(original.getSotDocumentVersion());
    v1.setHoldingDocumentVersion(original.getHoldingDocumentVersion());
    v1.setErrorCount(original.getErrorCount());

    HeaderRequestDTO oldHeader = original.getHeaderRequestData();
    if (oldHeader != null) {
        HeaderRequestDTOV1 newHeader = new HeaderRequestDTOV1();
        newHeader.setClientDocumentId(oldHeader.getAssociationHoldingId());
        newHeader.setClientDocumentVersion(String.valueOf(oldHeader.getClientSOTVersion()));
        newHeader.setPlanDocumentId(oldHeader.getPlanSOTId());
        newHeader.setPlanDocumentVersion(String.valueOf(oldHeader.getPlanSOTVersion()));
        v1.setHeaderRequestData(newHeader);
    }

    return v1;
}

}
